const mysql2 = require('mysql2/promise'); // MySQL client for Node.js with focus on performance
const debug = require('debug')('app'); // use instead of console.log

require('dotenv').config(); // uses .env file for environmental-specific variables

let dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: 30000,
  database: 'demo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql2.createPool(dbConfig);

async function getAllBlogPosts() {
  const result = await pool.execute('SELECT * FROM blog'); // use execute instead of query
  // debug(result[0]); // result of the query
  // debug(result[1]); // meta data
  return result[0];
}

async function getBlogPost(id) {
  const result = await pool.execute('SELECT * FROM `blog` WHERE id = ?', [id]); // use execute instead of query
  if (result[0].length < 1) {
    throw new Error('Blog with this id was not found');
  }
  // debug(result[0][0]); // result of the query
  // debug(result[1][0]); // meta data
  return result[0][0];
}

async function insertPost(title, subtitle, author, datecreated) {
  await pool.execute(
    'INSERT INTO `blog` SET title = ?, subtitle = ?, author = ?, datecreated = ?',
    [title, subtitle, author, datecreated]
  );
}

// Usage Example:
// ---
// insertPost(
//   'Prepared statements',
//   'Both the mysql and mysql2 package by default emulate prepared statements client-side.',
//   'Ever Pot',
//   '2019-01-09'
// );

module.exports = {
  pool, getAllBlogPosts, getBlogPost, insertPost
};
