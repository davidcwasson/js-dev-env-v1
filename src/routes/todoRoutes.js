const express = require('express');
const { MongoClient, ObjectID } = require('mongodb'); // same as: const mongoClient = require('mongodb').MongoClient;
const debug = require('debug')('app:todoRoutes');

const todoRouter = express.Router();

todoRouter.route('/')
  .get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'demoApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('todos');

        const todos = await col.find().toArray();

        res.render(
          'pages/todo',
          {
            title: 'To Do',
            todos
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });

todoRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'demoApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('todos');

        const todo = await col.findOne({ _id: new ObjectID(id) });

        debug(todo);

        res.render(
          'pages/todoView',
          {
            title: 'To Do',
            todo
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });

module.exports = todoRouter;
