const express = require('express');
const morgan = require('morgan');
// const db = require('../db/index.js');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('./client/dist'));

app.listen(port, () => console.log('Port:', port));