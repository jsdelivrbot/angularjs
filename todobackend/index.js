const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { check, oneOf, validationResult } = require('express-validator/check');

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

var tasks = [];

app.post('/task/create', [
  check('name').exists(),
  check('dueDate').exists(),
  check('priority').exists().isInt(),
  
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).send({
      errors: errors.mapped()
    })
  }
  
  tasks.push(req.body);
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

