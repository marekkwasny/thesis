--queries used to set up a database

CREATE DATABASE graphql;
CREATE USER dev WITH ENCRYPTED PASSWORD 'dev';
GRANT ALL PRIVILEGES ON DATABASE graphql TO dev;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) CHECK(LENGTH(password) > 7)
);

GRANT ALL PRIVILEGES ON TABLE users to dev;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public to dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT ON SEQUENCES TO dev;

ALTER TABLE users ALTER COLUMN password TYPE text;

CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    fk_users SERIAL REFERENCES users(id) ON DELETE CASCADE,
    token_version INTEGER DEFAULT 0
);

ALTER TABLE refresh_tokens ADD CONSTRAINT refresh_tokens_fk_users_unique UNIQUE (fk_users);

CREATE OR REPLACE FUNCTION users_insert_trigger_fnc() RETURNS trigger AS $$
BEGIN
    INSERT INTO "refresh_tokens"("fk_users")
         VALUES(NEW."id");
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER users_insert_trigger AFTER
INSERT ON "users"
FOR EACH ROW EXECUTE PROCEDURE users_insert_trigger_fnc();

GRANT ALL PRIVILEGES ON TABLE refresh_tokens to dev;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    fk_users SERIAL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    likes BIGINT,
    created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE posts ALTER COLUMN likes SET DEFAULT 0;

GRANT ALL PRIVILEGES ON TABLE posts to dev;

CREATE TABLE likes(
    id SERIAL PRIMARY KEY,
    fk_posts_likes SERIAL REFERENCES posts(id) ON DELETE CASCADE,
    fk_users_likes SERIAL REFERENCES users(id) ON DELETE CASCADE
);

GRANT ALL PRIVILEGES ON TABLE likes to dev;

CREATE TABLE posts_source(
    id SERIAL PRIMARY KEY,
    event_log TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

GRANT ALL PRIVILEGES ON TABLE posts_source TO dev;

CREATE TABLE posts_and_likes(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    is_create BOOLEAN,
    author_id INTEGER,
    author_name VARCHAR(30),
    content TEXT,
    likes BIGINT,
    is_like BOOLEAN,
    like_user_id INTEGER,
    like_post_id INTEGER
);

GRANT ALL PRIVILEGES ON TABLE posts_and_likes TO dev;

ALTER TABLE posts_and_likes ALTER COLUMN is_create SET DEFAULT FALSE;
ALTER TABLE posts_and_likes ALTER COLUMN is_like SET DEFAULT FALSE;

CREATE TABLE posts_and_likes_source(
    id SERIAL PRIMARY KEY,
    event_log TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

GRANT ALL PRIVILEGES ON TABLE posts_and_likes_source TO dev;