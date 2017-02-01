const Router = require('express').Router();

Router
  .get('/', (req, res) => {
    res.send('users');
  })
  .get('/:id', (req, res) => {})
  .post('/:id', (req, res) => {})
  .put('/:id', (req, res) => {})
  .delete('/:id', (req, res) => {})
