import crypto from 'crypto';
let { getUserSalt } = require('../../../app/auth/');

export default function (req, res) {
    let { username } = req.body;
    let salt = getUserSalt(username);
    if (!salt) {
        //user does not exist.
        return response.status(404).send({ error: 'User not found' });
    }

    //generate challenge for client.
    const timestamp = Date.now();
    const nonce = Buffer.concat([crypto.randomBytes(16), Buffer.from(timestamp.toString())]);

    res.status(200).json({ nonce, salt });
}
