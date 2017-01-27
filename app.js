var express = require('express'),
    Sequelize = require('sequelize'),
    bodyParser = require('body-parser'),
    models = require('./models'),
    http = require('http'),
    app = express(),
    server = http.createServer();
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
app.use(express.static(__dirname + '/uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000,
    ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var EnseignantRoutes = require('./routes/enseignantRoutes.js')(models);
var MatiereRoutes = require('./routes/matiereRoutes.js')(models);
app.use('/api/', MatiereRoutes);
models.sequelize.sync().then(function() {

    server.on('request', app);
    server.listen(port, ip, function() {
        console.log('------------------------------------------ The environment is : ', process.env.NODE_ENV);
        console.log("listening on port " + server.address().port);
    });
});