const multer  = require('multer');

const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

const { nanoid } = require('nanoid/async');

const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            nanoid()
            .then(id => {
                cb(null, id);
            })
            .catch(err => {
                cb(err, null);
            });
        },
        storageClass: 'INTELLIGENT_TIERING'
    })
});

module.exports = upload;