const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

const mysql = require('../../utils/mysql.js');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      // MySQL method
      // ------------
      (async function validateUser() {
        try {
          const results = await mysql.pool.execute('SELECT * FROM `user` WHERE username = ?', [username]);
          const user = results[0][0];
          debug(results);
          debug(user);
          debug(typeof user);

          if ((typeof user !== 'undefined') && (user.password === password)) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          debug(err.stack);
        }
      }());

      // MongoDB method
      // --------------
      // const url = 'mongodb://localhost:27017';
      // const dbName = 'demoApp';

      // (async function mongo() {
      //   let client;
      //   try {
      //     client = await MongoClient.connect(url);
      //     debug('Connected correctly to server');

      //     const db = client.db(dbName);
      //     const col = db.collection('users');

      //     const user = await col.findOne({ username });

      //     if (user.password === password) {
      //       done(null, user);
      //     } else {
      //       done(null, false);
      //     }
      //   } catch (err) {
      //     debug(err.stack);
      //   }
      //   // Close connection
      //   client.close();
      // }());
    }
  ));
};
