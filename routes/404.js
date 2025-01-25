const express = require('express');

const errorController = require('../controllers/error');

const error = express.Router();

error.use(errorController.useError);

module.exports = error;