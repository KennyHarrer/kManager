import crypto from 'crypto';
let { getUserMasterHash } = require('../../../app/auth/');

export default function (req, res) {
    let { username } = req.body;
    let passwordHash = getUserMasterHash(username);
    if (!hash) {
        //user does not exist.
        return response.status(404).send('Username not found');
    }

    //generate challenge for client.
    const timestamp = Date.now();
    const nonce = crypto.randomBytes(16);
    const nonceWithTimestamp = Buffer.concat([nonce, Buffer.from(timestamp.toString())]);
    const challenge = crypto
        .createHmac('sha256', nonceWithTimestamp)
        .update(passwordHash)
        .digest();

    res.status(200).json({ challenge, nonce:nonceWithTimestamp });
}
