"use-strict";

const Joi = require('joi');
const { MongoClient, ObjectId } = require('mongodb');
const shortId = require('shortid');
const JWT = require("./jwt");

//Temporal URI, when deploy change to deploy database and credentials
const uri = 'mongodb+srv://gus-production:QtQX4awd0QYt9Lba@production.zwp4w.mongodb.net/netflix-clone?retryWrites=true&w=majority';

function usersHandler(){
    this.userSchema = Joi.object({
        name: Joi.string()
                .min(2)
                .max(30)
                .required(),
        last_name: Joi.string()
                .min(2)
                .max(30)
                .required(),
        email: Joi.string()
                .email()
                .required(),
        password: Joi.string()
                .pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/))
                .required(),
        confirm_password: Joi.ref('password'),
        picture: Joi.string()
                .uri(),
        birthday: Joi.date()
                .iso()
                .less('now')
                .required(),
    });
    this.generateAPIKey = () => {
        let newKey = shortId.generate();
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        client.connect().then(()=>{
            client.db('netflix-clone').collection('API').findOne({key:newKey}).then(key=>{
                if(key === null){
                    client.db('netflix-clone').collection('API').insertOne({
                        key: newKey,
                        calls_per_day:0,
                        transactions: []
                    }).then((jalo)=>{
                        client.close();
                    });
                }
            });
        });
        return newKey;
    };
    this.validKey = async (searchKey) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect();
        let key = await client.db('netflix-clone').collection('API').findOne({key:searchKey});
        client.close();
        return key !== null;
    };
    this.saveTransaction = (searchKey, transaction) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        client.connect().then(()=>{
            client.db('netflix-clone').collection('API').findOne({key:searchKey}).then(key=>{               
                if(key === null) return;
                key.transactions.push(transaction);
                client.db('netflix-clone').collection('API').updateOne(
                    {key:searchKey},
                    {$set: {
                        calls_per_day:key.calls_per_day+1,
                        transactions:key.transactions
                    }}
                ).then(()=>client.close());
            });
        });
    };
    this.signin = async (signin) => {
        let user = await this.getUserByEmail(signin.email);
        if (!user) return null;
        if (user.password !== signin.password) return null;
        return user._id;
    };
    this.createSession = async (userId) => {
        //TODO: IMPLEMENT JWT AUTH FOR SESION
        let session = `${ JWT.generate(userId) }`;
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect();
        let searchedSession = await client.db('netflix-clone').collection('sessions').findOne({session:session});
        if(searchedSession === null){
            await client.db('netflix-clone').collection('sessions').insertOne({
                session: session,
                date: Date.now()
            });
            client.close();
        }
        return session;
    };
    this.validSession = async (session) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect();
        let searchedSession = await client.db('netflix-clone').collection('sessions').findOne({session:session});
        client.close();
        return searchedSession !== null;
    };
    this.validateUser = (user) => {
        return this.userSchema.validate(user);
    };
    this.getUser = async (id) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect();
        let key = await client.db('netflix-clone').collection('users').findOne({_id:ObjectId(id)});
        client.close();
        return key;
    };
    this.getUserByEmail = async (email) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect();
        let key = await client.db('netflix-clone').collection('users').findOne({email:email});
        client.close();
        return key;
    };

    this.postUser = async (user) => {
        let u = await this.getUserByEmail(user.email);
        if(u) return null;
        delete user.confirm_password;
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect();
        await client.db('netflix-clone').collection('users').insertOne(user);
        await client.close();
        return user;
    };

    this.putUser = async (id, user) => {
        let oldUser = await this.getUser(id);
        if(!oldUser) return;

        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect(); 
        client.db('netflix-clone').collection('users').updateOne(
            {_id:ObjectId(id)},
            {$set: {
                name: user.name,
                last_name: user.last_name,
                password: user.password,
                birthday: user.birthday,
                picture: user.picture,
            }}
        ).then(()=>client.close());
        return user;
    };
    this.deleteUser = async (id) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect(); 
        client.db('netflix-clone').collection('users').deleteOne({
            _id:ObjectId(id)
        }, (err, obj) =>{
            client.close();
        });
    };
}
module.exports = new usersHandler();