/*
 *  Filename: index.js
 *  Author: Grant Spencer
 *  Date: 5/17/2017
 */

const express = require('express'),
      path = require('path'),
      multer = require('multer'),
      bodyParser = require('body-parser'),
      _ = require('lodash');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

/*
 *  Express Routers
 */

const siteRouter = require(__dirname+ '/app/siteRouter.js');

app.use('/', siteRouter);
app.use(express.static('/public', __dirname+ '/public/'));

// Actually start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('App running on port ', process.env.PORT || 3000);
});
