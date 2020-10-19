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
module.exports.insertActivity = (
    user_fk,
    activity,
    begin_date,
    end_date,
    activity_type,
    difficulty,
    notes
) => {
    const params = [
        user_fk,
        activity,
        begin_date,
        end_date,
        activity_type,
        difficulty,
        notes,
    ];
    console.log("_from db", params);

    const q = `INSERT INTO activities (user_fk, activity, begin_date, end_date, activity_type, difficulty, notes) VALUES ($1, $2, $3, $4, $5, $6, $7);`;

    return db.query(q, params);
};

/* 

id SERIAL PRIMARY KEY,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
user_fk INT REFERENCES users(id) NOT NULL,
activity VARCHAR (255) NOT NULL,
begin_date TIMESTAMP DEFAULT NULL,
end_date TIMESTAMP DEFAULT NULL,
activity_type VARCHAR (255) DEFAULT NULL,
difficulty INT DEFAULT NULL,
notes TEXT DEFAULT NULL



INSERT INTO activities (user_fk, activity, begin_date, end_date, activity_type, difficulty, notes) VALUES (6, 'sleep', '2020-10-18 23:40:00', '2020-10-18 08:00:00', 2, 2, 'I dreamt about code...'); 


*/
