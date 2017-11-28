var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Form = require('./api/models/formModel'),
    bodyParser = require('body-parser');

// mongoose instance connection url
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bildDB',
    {useMongoClient: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/formRoute');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Bild RESTful Api server started on port: ' + port);