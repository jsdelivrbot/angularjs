var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var serverStatic = require('serve-static');
var morgan = require('morgan');
var methodOverride = require('method-override');

//Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/angularjsnodejs', { useMongoClient: false });

mongoose.connection.on('error', (err) => {
    console.log(err);
});
//Configuracion

//Localizacion de ficheros estaticos
app.use(serverStatic(__dirname + '/public', { 'index': ['index.html', 'index.htm'] }));

//Muestra un log de todos los request
app.use(morgan('dev'));

//Permite cambiar el HTML por el metodo POST
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.raw({
    type: "*/*"
}));

app.use(bodyParser.json());

//Simula el DELETE and PUT
app.use(methodOverride());

var todo = mongoose.model('tareas', {
    text: String,
    done: Boolean
});

app.get('/api/tareas', (req, res) => {
    todo.find((err, tareas) => {
        if (err) {
            res.send(err);
        }
        res.json(tareas);
    });
});

app.post('/api/tareas', (req, res) => {
    todo.create({
        text: req.body.text,
        done: false
    }).then(tarea => {
        res.json(tarea);
    }).catch(err => {
        res.send(err);
    })
});

app.listen('8081', () => {
    console.log('La aplicacion esta escuchando por el puerto 8081');
});