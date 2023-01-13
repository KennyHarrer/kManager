import crypto from 'crypto';
let { getUserMasterHashAndSalt } = require('../../../app/auth/');

const timeLimitInSeconds = 5;

export default function (req, res) {
    let { response, nonce, username } = req.body;
    let saltAndHash = getUserMasterHashAndSalt(username);
    if (!saltAndHash) {
        //user does not exist.
        return response.status(404).json({ error: 'Username not found' });
    }

    let { hash: passwordHash } = saltAndHash;

    //determine if timeouted out or not
    const receivedTimestamp = parseInt(nonce.slice(-13).toString());
    const currentTimestamp = Date.now();
    const timeDiff = (currentTimestamp - receivedTimestamp) / 1000;

    if (timeDiff > timeLimitInSeconds) {
        
        return res.status(408).json({error:'Request Timeout'})
    }

    const challengeAnswer = crypto
        .createHmac('sha256', nonceWithTimestamp)
        .update(passwordHash)
        .digest();

    const isValid = response.equals(challengeAnswer);

    if (isValid) {
        //TODO: send auth JWT (allows sever to send client encrypted info)
        //TODO: restrict sign in for 5 seconds after a user has signed in (or an attacker could replay the request and get authed.)
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ error: 'Incorrect Password' });
    }
}
