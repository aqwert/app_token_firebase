'use strict';

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const fetch = require("node-fetch");

dotenv.config();

const oneMinute = 60 * 1000;
const tokenDurations = (10 * oneMinute).toString();

module.exports.fireTokenToAppToken = (event, context, callback) => {
  const url = process.env.verifyTokenUrl;

  const fireToken = event.headers['x-firetoken'];

  const token = fireToken.replace('Bearer ', '')

  console.log('Firetoken verify begin');
  fetch(`${url}?idToken=${token}`)
    .then(result => result.json())
    .then(data => {
      console.log('Firetoken verify completed');

      if (data.error) {
        callback("Unauthorized", null);
      } else {

        //todo create app token including data.uid and set the response
        const appToken = jwt.sign(
          { userId: data.uid },
          process.env.appSecret,
          { expiresIn: tokenDurations });

        const response = {
          statusCode: 200,
          body: appToken
        };
        callback(null, response);
      }
    });
};
