const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const mysql = require('../utils/mysql.js');

const authRouter = express.Router();

authRouter.route('/signUp')
  .get((req, res) => {
    res.render('pages/signUp', { title: 'Sign Up' });
  })

// MySQL method
// ------------
  .post((req, res) => {
    const { username, password } = req.body;

    (async function addUser() {
      try {
        const results = await mysql.pool.execute('INSERT INTO `user` SET username = ?, password = ?', [username, password]);
        debug(results); // not an undefined array with hash inside of it
        debug(results[0]);
        debug(results[0].insertId);
        debug('after insert');
        req.login(results[0].insertId, () => {
          res.redirect('/auth/profile');
        });
      } catch (err) {
        debug(err);
      }
    }());
  });

// MongoDB method
// --------------
// .post((req, res) => {
//   const { username, password } = req.body;
//   const url = 'mongodb://localhost:27017';
//   const dbName = 'demoApp';

//   (async function addUser() {
//     let client;
//     try {
//       client = await MongoClient.connect(url);
//       debug('Connected correctly to server');

//       const db = client.db(dbName);

//       const col = db.collection('users');
//       const user = { username, password };
//       const results = await col.insertOne(user);
//       debug(results);
//       req.login(results.ops[0], () => {
//         res.redirect('/auth/profile');
//       });
//     } catch (err) {
//       debug(err);
//     }
//   }());
// });

authRouter.route('/signin')
  .get((req, res) => {
    res.render('pages/signin', {
      title: 'Sign In'
    });
  })
  .post(passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureRedirect: '/'
  }));

authRouter.route('/profile')
  .all((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  })
  .get((req, res) => {
    res.json(req.user);
  });

module.exports = authRouter;
