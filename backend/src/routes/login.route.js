const express = require('express');
const router = express.Router();
const Joi = require('joi');

const create_header = require('../scripts/create_header.script');
const login_controller = require('../controllers/login.controller');

const schema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(20)
    .regex(RegExp('^[a-zA-Z0-9_]+'))
    .required(),
  password: Joi.string()
    .required()
});

const header = create_header('application/json');

// Error responses
const validation_error_response = { response: 400, error: 'Invalid login request.' };
const unauthorized_response = { response: 401, error: 'Invalid username or password.' };

router.post('/', function(request, response) {
  console.log('POST /login');
  console.dir(request.body);

  const { error, _ } = schema.validate(request.body);
  if (error) {
    response.writeHead(400, header);
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  const key = login_controller.login(request.body.username, request.body.password);
  if (!key) {
    response.writeHead(401, header);
    response.end(JSON.stringify(unauthorized_response));
    return;
  }

  response.writeHead(200, header);
  const valid_response = { response: 200, key: key };
  response.end(JSON.stringify(valid_response));
});

module.exports = router;