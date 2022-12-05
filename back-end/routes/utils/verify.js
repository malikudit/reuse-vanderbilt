const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
let privateKey = null;

function AESKey(bytes) {
    return new Promise((resolve, reject) => {
        if (privateKey) {
            resolve(privateKey);
        }

        crypto.scrypt(
            process.env.AES_256_PASSWORD,
            process.env.AES_256_SALT,
            bytes,
            (err, key) => {
                if (err) reject(err);

                privateKey = key;
                resolve(key);
            }
        );
    });
}

function randomBuffer(bytes) {
    return new Promise((resolve, reject) => {
        crypto.randomFill(new Uint8Array(bytes), (err, iv) => {
            if (err) reject(err);

            resolve(iv);
        });
    });
}

async function encrypt(data, ivBytes = 16) {
    let iv = await randomBuffer(ivBytes);
    const key = await AESKey(32);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(data, 'utf-8', 'base64url');
    encrypted += cipher.final('base64url');

    iv = Buffer.from(iv);
    encrypted = Buffer.from(encrypted, 'base64url');

    const secret = Buffer.concat([iv, encrypted]).toString('base64url');
    return secret;
}

async function decrypt(data, ivBytes = 16) {
    const buffer = Buffer.from(data, 'base64url');
    const iv = buffer.subarray(0, ivBytes);

    const encrypted = buffer.subarray(ivBytes);
    const key = await AESKey(32);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encrypted, 'base64url', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}

async function encryptJSON(obj) {
    const serializedJSON = JSON.stringify(obj);
    return await encrypt(serializedJSON);
}

async function decryptJSON(obj) {
    const deserializedJSON = await decrypt(obj);
    return JSON.parse(deserializedJSON);
}

module.exports = {
    encryptJSON,
    decryptJSON,
};
