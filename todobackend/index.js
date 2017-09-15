const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const api = require('./API');

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

app.use('/task', api)

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});