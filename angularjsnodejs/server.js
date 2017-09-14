var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var serverStatic = require('serve-static');
var morgan = require('morgan');
var methodOverride = require('method-override');

//Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/angularjsnodejs', { useMongoClient: true });

mongoose.connection.on('error', (err) => {
    console.log(err);
});
//Configuracion

//Localizacion de ficheros estaticos
app.use(serverStatic(__dirname + '/public'));

app.use('/node_modules', serverStatic(__dirname + '/node_modules'));

//Muestra un log de todos los request
app.use(morgan('dev'));

//Permite cambiar el HTML por el metodo POST
app.use(bodyParser.urlencoded({
    extended: true
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
    // var nuevo = new todo({
    //     text: req.body.text,
    //     done: false
    // });

    // nuevo.save((error) => {
    //     if (error) res.send(error);

    //     res.json(nuevo);
    // });

    todo.create({
        text: req.body.text,
        done: false
    }, (error, data) => {
        if (error) res.send(error);

        res.json(data);
    })
});

app.delete('/api/tareas/:tarea', (req, res) => {
    todo.remove({
        _id: req.params.tarea
    }, (error, data) => {
        if (error) res.send(error);

        todo.find((err, tareas) => {
            res.json(tareas);
        });
    })
});

app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
});

app.listen('8081', () => {
    console.log('La aplicacion esta escuchando por el puerto 8081');
});