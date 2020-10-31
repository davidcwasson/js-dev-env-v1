const express = require('express');
const debug = require('debug')('app:blogRoutes');

const mysql = require('../utils/mysql.js');

const blogRouter = express.Router();

blogRouter.route('/')
  .get((req, res) => {
    (async function getAllBlogs() {
      const result = await mysql.pool.execute('SELECT * FROM blog');
      debug(result[0]);
      res.render(
        'pages/blog',
        {
          title: 'Blog',
          blogs: result[0]
        }
      );
    }());
  });

blogRouter.route('/:id')
  .all((req, res, next) => {
    (async function getPostById() {
      const { id } = req.params;
      const result = await mysql.pool.execute('SELECT * FROM `blog` WHERE id = ?', [id]);
      debug(result[0][0]);
      [[req.blog]] = result;
      next();
    }());
  })
  .get((req, res) => {
    res.render(
      'pages/blogView',
      {
        title: 'Blog Post',
        blog: req.blog
      }
    );
  });

module.exports = blogRouter;
