"use-strict";

const Joi = require('joi');
const shortId = require('shortid');

function dataHandler(){
    this.users = [];
    this.lastUserId = 0;
    this.movies = [];
    this.apps = {};

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
        let key = shortId.generate()
        this.apps[key] = {
            calls_per_day : 0,
            transactions:[],
        }
        return key;
    }

    // TODO: Validate that the API Key does not have too many calls
    this.validKey = (key) => {
        return this.apps[key] !== undefined;
    }

    this.saveTransaction = (key, transaction) => {
        this.apps[key].calls_per_day++;
        this.apps[key].transactions.push(transaction);
    }

    this.validateUser = (user) => {
        return this.userSchema.validate(user);
    }

    this.getUser = (id) => {
        return this.users.find(user => user.id == id);
    }

    this.postUser = (user) => {
        user.id = ++this.lastUserId;
        delete user.confirm_password;
        this.users.push(user);
        return user;
    }

    this.putUser = (id, user) => {
        const index = this.users.findIndex(user => user.id == id);
        user.id = id;
        delete user.confirm_password;
        this.users[index] = user;
        return user;
    }

    this.deleteUser = (id) => {
        const index = this.users.findIndex(user => user.id == id);
        this.users.splice(index, 1);
    }
}

module.exports = new dataHandler();