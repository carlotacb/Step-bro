const db = require("../db.js");

async function tokenToEmail(token){
    const result = await db.query('SELECT * FROM users WHERE token=$1', [token]);
    const email = result.rows[0]['user_mail'];
    // TODO make sure it exists
    return email;
}

function generateString(length=250){
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function generateToken(email){
    const newTkn = generateString();
    // check if newTkn is unique
    const result = await db.query('SELECT * FROM users WHERE token=$1', [newTkn]);
    if(result.rows.length > 0){
        return await generateToken(email);
    }
    // update token in db
    db.query('UPDATE users SET token=$1 WHERE user_mail=$2', [newTkn, email]);
    return newTkn;
}

async function revokeToken(token){
    // check if token exists
    const result = await db.query('SELECT * FROM users WHERE token=$1', [token]);
    if(result.rows.length === 0){
        return false;
    }
    // update token in db
    await db.query('UPDATE users SET token=NULL WHERE token=$1', [token]);
    return true;
}


module.exports = {
    tokenToEmail,
    generateToken,
    revokeToken,
};