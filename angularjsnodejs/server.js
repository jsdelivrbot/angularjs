var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var serverStatic = require('serve-static');
var morgan = require('morgan');
var methodOverride = require('method-override');

//Conexion a la base de datos
mongoose.connect('mongoose://localhost:27017/angularjsnodejs', { useMongoClient: false });

//Configuracion

//Localizacion de ficheros estaticos
app.use(serverStatic(__dirname + '/public', {'index': ['index.html', 'index.htm']}));

//Muestra un log de todos los request
app.use(morgan('dev'));

//Permite cambiar el HTML por el metodo POST
app.use(bodyParser.urlencoded({
    extended: true
}));

//Simula el DELETE and PUT
app.use(methodOverride());

app.listen('8081', () => {
    console.log('La aplicacion esta escuchando por el puerto 8081');
});