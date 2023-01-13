function getUserSalt(username) {
    return user[username].salt
}

function getUserHash(username) {
    return user[username].hash
}