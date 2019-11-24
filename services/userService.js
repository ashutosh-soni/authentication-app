const db = require("../db/db.js");

const insertUser = async function (newUser){
    try {
        return  db.insert(newUser);
    } catch(e){
        throw new Error(e.message);
    }
    
}

module.exports = {insertUser};
