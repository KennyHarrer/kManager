import crypto from 'crypto';

const timeLimitInSeconds = 5;

export default function (req, res) {
    let { response, nonce, challenge } = req.body;

    const receivedTimestamp = parseInt(nonce.slice(-13).toString());
    const currentTimestamp = Date.now();
    const timeDiff = (currentTimestamp - receivedTimestamp) / 1000;
    //timestamp is basically "signed" because the hash was created with the hashed password
    if (timeDiff > timeLimitInSeconds) {
        return res.status(408).send('Request Timeout');
    }

    const isValid = response.equals(challenge);

    if (isValid) {
        //TODO: send auth JWT (allows sever to send client encrypted info)
        //TODO: restrict sign in for 5 seconds after a user has signed in (or an attacker could replay the request and get authed.)
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ error: 'Incorrect Password' });
    }
}
