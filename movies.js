"use strict";

const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.send('movies endpoint');
});

module.exports = app;