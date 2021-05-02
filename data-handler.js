"use-strict";

const Joi = require('joi');

function dataHandler(){
    this.users = [];
    this.lastUserId = 0;
    this.movies = [];

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