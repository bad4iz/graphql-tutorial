const express = require('express');
const graghqlHTTP = require('express-graphql');

const app = express();
const PORT = 3005;

app.use('/graphql', graghqlHTTP({}));

app.listen(PORT, err => console.log(err ? err : 'Server started'));
