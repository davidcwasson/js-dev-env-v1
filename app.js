const express = require('express');
const chalk = require('chalk'); // add color to console ouput
const debug = require('debug')('app'); // use instead of console.log
const morgan = require('morgan'); // log web traffic to console
const path = require('path'); // provides proper slashes in paths

const blogRouter = require('./src/routes/blogRoutes');
const todoRouter = require('./src/routes/todoRoutes');
const adminRouter = require('./src/routes/adminRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny')); // use 'combined' if you want more information
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/css')));
app.use('/webfonts', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/webfonts')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/blog', blogRouter);
app.use('/todo', todoRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.render('pages/index', { list: ['a', 'b'], title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About' });
});

app.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Contact' });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
