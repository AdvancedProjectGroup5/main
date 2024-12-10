drop table if exists favourites;
drop table if exists reviews;
drop table if exists user_groups;
drop table if exists groups;
drop table if exists group_custom_content;
drop table if exists users;

-- create database here
CREATE TABLE
    users
(
    id       SERIAL PRIMARY KEY,
    user_name     VARCHAR(100) NOT NULL,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE
    reviews
(
    id         SERIAL PRIMARY KEY,
    user_id    INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    movie_id   INT NOT NULL,
    comment    TEXT,
    rating     INT CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE groups
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    owner_id    INT          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_groups
(
    id       SERIAL PRIMARY KEY,
    user_id  INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    group_id INT NOT NULL REFERENCES groups (id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status   VARCHAR(10)              DEFAULT 'pending',
    UNIQUE (user_id, group_id)
);

CREATE TABLE group_custom_content
(
    id           SERIAL PRIMARY KEY,
    group_id     INT NOT NULL REFERENCES groups (id) ON DELETE CASCADE,
    content_type VARCHAR(50),
    content_id   INT,
    added_by     INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    added_at     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
    favourites (
                   id SERIAL PRIMARY KEY,
                   user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
                   movie_id INT NOT NULL,
                   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                   CONSTRAINT unique_user_movie UNIQUE (user_id, movie_id)
);