drop table if exists favourites;
drop table if exists reviews;
drop table if exists user_groups;
drop table if exists groups;
drop table if exists users;

-- Create Users Table
CREATE TABLE
    users (
        id SERIAL PRIMARY KEY, -- Auto-incrementing integer ID for the user
        user_name VARCHAR(100) NOT NULL, -- User's name
        email VARCHAR(255) UNIQUE NOT NULL, -- User's email (unique for login)
        password VARCHAR(255) NOT NULL -- Encrypted password for authentication
    );

-- Create Reviews Table
CREATE TABLE
    reviews (
        id INT PRIMARY KEY, -- Auto-incrementing integer ID for the review
        user_id INT NOT NULL REFERENCES users (id), -- Foreign key referencing the user who created the review
        movie_id INT NOT NULL, -- TMDB movie ID (fetched from the API, not auto-generated)
        rating INT CHECK (rating BETWEEN 1 AND 5), -- Movie rating (1-5 scale)
        comment TEXT, -- Review comment
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of when the review was created
    );

-- Create Groups Table
CREATE TABLE
    groups (
        id INT PRIMARY KEY, -- Auto-incrementing integer ID for the group
        group_name VARCHAR(100) NOT NULL, -- Name of the group
        owner_id INT NOT NULL REFERENCES users (id), -- Foreign key referencing the user who owns the group
        description TEXT, -- Description of the group
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of when the group was created
    );

-- Create UserGroups Table
CREATE TABLE
    user_groups (
        id INT PRIMARY KEY, -- Auto-incrementing integer ID for the record
        user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE, -- Foreign key referencing the user
        group_id INT NOT NULL REFERENCES groups (id) ON DELETE CASCADE, -- Foreign key referencing the group
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of when the user was added to the group
    );

CREATE TABLE
    favourites (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        movie_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_user_movie UNIQUE (user_id, movie_id)
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
