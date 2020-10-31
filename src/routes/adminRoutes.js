const express = require('express');
const { MongoClient } = require('mongodb'); // same as: const mongoClient = require('mongodb').MongoClient;
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const todos = [
  {
    title: 'Walk the dog',
    genre: 'exercise',
    author: 'David Wasson',
    repeat: 'daily',
    completed: false
  },
  {
    title: 'Brush teeth',
    genre: 'health',
    author: 'David Wasson',
    repeat: 'daily',
    completed: false
  },
  {
    title: 'Floss teeth',
    genre: 'health',
    author: 'David Wasson',
    repeat: 'daily',
    completed: false
  },
  {
    title: 'Bike ride',
    genre: 'exercise',
    author: 'David Wasson',
    repeat: 'weekly',
    completed: false
  },
  {
    title: 'Cook something new',
    genre: 'cooking',
    author: 'David Wasson',
    repeat: 'weekly',
    completed: false
  },
  {
    title: 'Family game night',
    genre: 'family',
    author: 'David Wasson',
    repeat: 'weekly',
    completed: false
  },
  {
    title: 'Family movie night',
    genre: 'family',
    author: 'David Wasson',
    repeat: 'weekly',
    completed: false
  }
];

adminRouter.route('/')
  .get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'demoApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const response = await db.collection('todos').insertMany(todos);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }());
    // res.send('inserting todos');
  });

module.exports = adminRouter;
