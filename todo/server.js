var express = require('express');
var app = express();
var serverStatic = require('serve-static');
var morgan = require('morgan');

//Localizacion de ficheros estaticos
app.use(serverStatic(__dirname + '/public'));

app.use('/node_modules', serverStatic(__dirname + '/node_modules'));

//Muestra un log de todos los request
app.use(morgan('dev'));

app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
});

app.listen('8081', () => {
    console.log('La aplicacion esta escuchando por el puerto 8081');
});