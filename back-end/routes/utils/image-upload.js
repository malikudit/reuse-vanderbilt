require('dotenv').config();

const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { nanoid } = require('nanoid/async');

// const { Photo } = require('../../models');

const Bucket = process.env.S3_BUCKET_NAME

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});

async function upload(id, body, imageType) {
    const params = {
        Bucket,
        Key: id + '.' + imageType,
        Body: body,
        StorageClass: 'INTELLIGENT_TIERING'
    };

    await s3Client.send(new PutObjectCommand(params));
}

async function uploadImage(photoType, body, imageType, parentId) {
    // The probablity of collision is so low that it can be neglected
    const id = await nanoid();
    
    await upload(id, body, imageType);

    const url = `https://${Bucket}.s3.amazonaws.com/${id}.${imageType}`;
    console.log(url);

    // await Photo.create({
    //     id,
    //     photoType,
    //     imageType,
    //     parentId
    // });

    // https://reuse-vandy.s3.amazonaws.com/2pWDUCys6y9NhfY0TFCjP.txt
}

uploadImage('User', 'Hello World', 'txt');

module.exports = uploadImage;