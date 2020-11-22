const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const shortenUtilRouter = require('./routes/shorten');
const mainRouter = require('./routes/main');
const port = require('./constants').port;

mongoose.connect('mongodb+srv://root:9yHA4fgrWj4jGap@linkshortener.pmvzl.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
});

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/shorten', shortenUtilRouter);
app.use('/', mainRouter);

app.listen(port, () => console.log("Run server"));
