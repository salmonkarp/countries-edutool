var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express()
const port = 3001

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('index');
})
app.get('/:name', (req, res) => {
  let name = req.params.name;
  res.render('detail',{name});
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;
