var express = require('express');
var chalk = require('chalk'); // add color to console ouput
var debug = require('debug')('app') // use instead of console.log
var morgan = require('morgan'); // log web traffic to console
var path = require('path'); // provides proper slashes in paths

var app = express();

app.use(morgan('tiny')); // use 'combined' if you want more information
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.listen(3000, function(){
  debug(`listening on port ${chalk.green('3000')}`);
});