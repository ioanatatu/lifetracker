const spicedPg = require("spiced-pg");
const dbUrl =
    process.env.DATABASE_URL ||
    "postgres://postgres:ioana@localhost:5432/lifetrk";
const db = spicedPg(dbUrl);

/*
 *
 * ___________________________________________________________________users
 */
module.exports.addUser = (first, last, email, pass) => {
    const q = `INSERT into users (first, last, email, pass, created_at)
    VALUES ($1, $2, $3, $4, current_timestamp) RETURNING id;`;

    const params = [first, last, email, pass];
    return db.query(q, params);
};
module.exports.getUser = (email) => {
    const q = `SELECT * FROM users WHERE email=$1;`;
    const params = [email];
    return db.query(q, params);
};
module.exports.checkEmail = (email) => {
    const q = `SELECT * FROM users WHERE email=$1;`;

    const params = [email];
    return db.query(q, params);
};
module.exports.updatePassword = (email, pass) => {
    const q = `UPDATE users SET pass=$2 WHERE email=$1 RETURNING id;`;

    const params = [email, pass];
    return db.query(q, params);
};
/*
 *
 * ___________________________________________________________________activities
 */
module.exports.addProfile = (age, city, imgurl, user_id) => {
    const q = `INSERT into user_profile (age, city, imgurl, user_id) VALUES ($1, $2, $3, $4);`;
    const params = [age, city, imgurl, user_id];
    return db.query(q, params);
};
