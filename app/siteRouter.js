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
      const extension = '.'+ _.last(_.split(file.originalname, '.'));
      cb(null, req.body.albumName+ uuid()+ extension);
    }
  })
});

router.post('/uploadPhoto', uploadMiddleware.any(), (req, res) => {
  console.log('Ran middleware.');
  res.send('Upload successful!');
});

module.exports = router;
