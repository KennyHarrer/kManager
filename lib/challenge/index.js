import crypto from 'crypto';

export function generateChallenge(salt, bytes = 16) {
    
    const timestamp = Date.now();
    const nonce = Buffer.concat([crypto.randomBytes(bytes), Buffer.from(timestamp.toString())]);

    //TODO: generate JWT

    return {nonce, salt}

}

export function hashPassword(password, salt) {

}

export function verifyChallengeResponse(response, challengeJWT) {

    //TODO: verify jwt integrity 

    //TODO: verify jwt is not blacklisted.

    let { user, nonce, expire } = challengeJWT
    
    //TODO: if jwt is not expired

    //TODO: ensure 

}

export function generateChallengeResponse({ nonce, salt }) {
    
}