
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

CREATE  TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name  text  NOT NULL,
    password  text  NOT NULL,
    email  text unique  NOT NULL,
    admin_id INTEGER NOT NULL  REFERENCES admins(id),
    time TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS users_tokens (
    id SERIAL PRIMARY KEY,
    token text NOT NULL,
    time TIMESTAMP DEFAULT NOW(),
    user_id INTEGER NOT NULL  REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS public.langs
(
    id serial NOT NULL,
    name text NOT NULL,
    CONSTRAINT user_payment_pkey PRIMARY KEY (id),
    CONSTRAINT name_unique UNIQUE (name)
);

