
CREATE TABLE IF NOT EXISTS  admins(
    id SERIAL PRIMARY KEY,
    name  text  NOT NULL,
    password  text  NOT NULL,
    email  text unique  NOT NULL,
    time TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS admins_tokens (
    id SERIAL PRIMARY KEY,
    token text NOT NULL,

    time TIMESTAMP DEFAULT NOW() ,
    admin_id INTEGER NOT NULL  REFERENCES admins(id)
);