/*
 *  Filename: siteRouter.js
 *  Author: Grant Spencer
 *  Date: 5/17/2017
 */
const express = require('express'),
      multer = require('multer'),
      aws = require('aws-sdk'),
      multerS3 = require('multer-s3'),
      _ = require('lodash'),
      moment = require('moment');

const router = express.Router();
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const uploadMiddleware = multer({
  storage: multerS3({
    s3: s3,
    acl: 'private',
    bucket: process.env.S3_BUCKET,
    key: (req, file, cb) => {
      const fileName = req.body.albumName+
        moment().format('MM-DD-YYYY-h-mm-ss');
      cb(null, fileName);
    }
  })
});

app.get('/', (req, res) => {
  res.sendfile('public/test.html', {root: __dirname})
});

app.get('/photoUpload', uploadMiddleware, (req, res) => {
  console.log('Ran middleware.');
});

module.exports = router;
