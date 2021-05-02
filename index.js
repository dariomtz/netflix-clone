"use strict";

const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('index.html');

});

app.listen(port, () => {
    console.log(`Neflix Clone app listening on port ${port}!`);
})