DROP TABLE IF EXISTS activities CASCADE;

CREATE TABLE activities (

    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_fk INT REFERENCES users(id) NOT NULL,
    activity VARCHAR (255) NOT NULL,
    begin_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    activity_type VARCHAR (255) DEFAULT NULL,
    difficulty INT DEFAULT NULL,
    notes TEXT
);