const express = require('express');
const chalk = require('chalk'); // add color to console ouput
const debug = require('debug')('app'); // use instead of console.log
const morgan = require('morgan'); // log web traffic to console
const path = require('path'); // provides proper slashes in paths

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny')); // use 'combined' if you want more information
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { list: ['a', 'b'], title: 'Hello World' });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
