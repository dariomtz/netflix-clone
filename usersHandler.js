"use-strict";

const Joi = require('joi');
const { MongoClient } = require('mongodb');
const shortId = require('shortid');

//Temporal URI, when deploy change to deploy database and credentials
const uri = 'mongodb+srv://gus-production:QtQX4awd0QYt9Lba@production.zwp4w.mongodb.net/netflix-clone?retryWrites=true&w=majority';

function usersHandler(){
    this.users = [];
    this.lastUserId = 0;
    this.sessions = {};

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
        return key !== null;
    }

    this.saveTransaction = (searchKey, transaction) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        client.connect().then(()=>{
            client.db('netflix-clone').collection('API').findOne({key:searchKey}).then(key=>{               
                if(key === null) return;
                console.log(key);
                key.transactions.push(transaction);
                client.db('netflix-clone').collection('API').updateOne(
                    {key:searchKey},
                    {$set: {
                        calls_per_day:key.calls_per_day+1,
                        transactions:key.transactions
                    }}
                );
            });
        });
    }

    this.signin = (signin) => {
        let user = this.getUserByEmail(signin.email);
        if (!user) return null;
        if (user.password !== signin.password) return null;

        return user.id;
    }

    this.createSession = (userId) => {
        let session = `${ shortId.generate() }/${ userId }`;
        this.sessions[session] = {
            created: Date.now(),
        };
        return session;
    }

    this.validSession = (session) => {
        return this.sessions[session] !== undefined;
    }

    this.validateUser = (user) => {
        return this.userSchema.validate(user);
    }

    this.getUser = (id) => {
        return this.users.find(user => user.id == id);
    }

    this.getUserByEmail = (email) => {
        return this.users.find(u => u.email == email);
    }

    this.postUser = (user) => {
        let u = this.getUserByEmail(user.email);
        if(u) return null;
        user.id = ++this.lastUserId;
        delete user.confirm_password;
        this.users.push(user);
        return user;
    }

    this.putUser = (id, user) => {
        const index = this.users.findIndex(user => user.id == id);
        user.id = id;
        user.email = this.users[index].email;
        delete user.confirm_password;
        this.users[index] = user;
        return user;
    }

    this.deleteUser = (id) => {
        const index = this.users.findIndex(user => user.id == id);
        this.users.splice(index, 1);
    }
    
}

module.exports = new usersHandler();