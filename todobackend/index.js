const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

var tasks = [];

app.use(cors());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function (request, response) {
  response.render('pages/index');
});

app.post('/task/create', (req, res) => {

  var errors = [{
    ValidationError: {
      name: []
    }
  }];

  if (!req.body.name) {
    errors[0].ValidationError.name.push({
      data: null,
      message: "Validation error: \"null\" Rule \"required(true)\" failed.",
      rule: "required",
      args: [
        true
      ]
    })
  }

  if(errors[0].ValidationError.name.length > 0){
    res.status(500).send(errors);
  }

  tasks.push(req.body);
  res.status(200).json(req.body);
});

app.get('/task', (req, res) => {
  res.json(tasks);
});

app.get('/task/destroy/:id', (req, res) => {
  var index = tasks.findIndex((item) => {
    return item.id == req.params.id
  });

  if (index == -1) {
    res.status(400).send('Task not found');
  }

  tasks.splice(index, 1);

  res.status(200).send('Task destroy');
});

app.post('/task/update', (req, res) => {

});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});