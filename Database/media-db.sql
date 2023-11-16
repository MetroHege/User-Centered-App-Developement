-- DROP DATABASE IF EXISTS mediashare;
-- CREATE DATABASE mediashare;
-- USE mediashare;

-- -- Create tables
-- CREATE TABLE UserLevel(
--   user_level_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   user_level VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE Users (
--   user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   username VARCHAR(255) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   user_level_id INT NOT NULL,
--   created_at TIMESTAMP NOT NULL
-- );

-- CREATE TABLE MediaItems (
--   media_id INT NOT NULL AUTO_INCREMENT,
--   user_id INT NOT NULL,
--   filename VARCHAR(255) NOT NULL,
--   filesize INT NOT NULL,
--   media_type VARCHAR(255) NOT NULL,
--   title VARCHAR(255) NOT NULL,
--   description VARCHAR(255),
--   created_at TIMESTAMP NOT NULL,
--   PRIMARY KEY (media_id),
--   FOREIGN KEY (user_id) REFERENCES Users(user_id)
-- );

-- CREATE TABLE Comments(
--   comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   user_id INT NOT NULL,
--   media_id INT NOT NULL,
--   comment VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES Users(user_id),
--   FOREIGN KEY (media_id) REFERENCES MediaItems(media_id)
-- );

-- -- add users
-- INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
-- INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);
-- INSERT INTO Users VALUES (110, 'Dragon', 'salasana', 'info@metris.fi', 3, null);
-- SELECT * FROM Users;

-- -- add user levels
-- INSERT INTO UserLevel (user_level) VALUES ('user'), ('manager'), ('admin');
-- SELECT * FROM UserLevel;

-- -- add media files
-- INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
--   VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg', null),
--          ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg', null),
--          ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg', null),
--          ('t39fh8.gif', 35743, 'Coffee room', null, 110, 'coffee/gif', null);
-- SELECT * FROM MediaItems;

-- -- add comments
-- INSERT INTO Comments (user_id, media_id, comment, created_at)
--   VALUES (260, 1, 'Nice drink', null),
--          (305, 2, 'Nice photo', null),
--          (110, 3, 'WOW!', null),
--          (260, 4, 'What a nice office', null);
-- SELECT * FROM Comments;

-- -- update user level
-- UPDATE Users SET user_level_id = 2 WHERE user_id = 260;
-- SELECT * FROM Users;

-- -- update comment
-- UPDATE Comments SET comment = 'Is it really you Miika?' WHERE comment_id = 2;
-- SELECT * FROM Comments WHERE comment_id = 2;

-- -- update title
-- UPDATE MediaItems SET title = 'New title' WHERE media_id = 3;
-- SELECT * FROM MediaItems;

-- -- delete media item
-- -- Create a temporary table to store comments related to media item with media_id = 3
-- CREATE TEMPORARY TABLE TempComments AS
-- SELECT comment_id
-- FROM Comments
-- WHERE media_id = 3;

-- -- Delete the comments related to media item with media_id = 3
-- DELETE FROM Comments
-- WHERE comment_id IN (SELECT comment_id FROM TempComments);

-- -- Delete the media item with media_id = 3
-- DELETE FROM MediaItems
-- WHERE media_id = 3;

-- -- Clean up the temporary table
-- DROP TEMPORARY TABLE TempComments;

-- -- Verify the results
-- SELECT * FROM MediaItems;

-- Drop the database if it exists and then create it

DROP DATABASE IF EXISTS MediaSharingApp;
CREATE DATABASE MediaSharingApp;
USE MediaSharingApp;

-- Create the tables

CREATE TABLE UserLevels (
    level_id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(50) NOT NULL
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_level_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(level_id)
);

CREATE TABLE MediaItems (
    media_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    filesize INT NOT NULL,
    media_type VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    rating_value INT NOT NULL CHECK (rating_value BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL
);

CREATE TABLE MediaItemTags (
    media_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (media_id, tag_id),
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
);


-- Insert the sample data

INSERT INTO UserLevels (level_name) VALUES ('Admin'), ('User'), ('Guest');

INSERT INTO Users (username, password, email, user_level_id) VALUES
('JohnDoe', 'to-be-hashed-pw1', 'johndoe@example.com', 2),
('JaneSmith', 'to-be-hashed-pw2', 'janesmith@example.com', 2),
('Anon5468', 'to-be-hashed-pw3', 'anon5468@example.com', 2),
('AdminUser', 'to-be-hashed-pw4', 'adminuser@example.com', 1);

INSERT INTO MediaItems (user_id, filename, filesize, media_type, title, description) VALUES
(1, 'sunset.jpg', 1024, 'image/jpeg', 'Sunset', 'A beautiful sunset'),
(2, 'sample.mp4', 20480, 'video/mp4', 'Sample Video', 'A sample video file'),
(2, 'ffd8.jpg', 2048, 'image/jpeg', 'Favorite food', null),
(1, '2f9b.jpg', 1024, 'image/jpeg', 'Aksux and Jane', 'friends');

INSERT INTO Comments (media_id, user_id, comment_text) VALUES
(1, 2, 'This is a wonderful photo!'),
(2, 1, 'Really nice video, thanks for sharing!');

INSERT INTO Likes (media_id, user_id) VALUES
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(2, 3),
(3, 3);

INSERT INTO Ratings (media_id, user_id, rating_value) VALUES
(1, 2, 5),
(2, 1, 4),
(1, 3, 4);

INSERT INTO Tags (tag_name) VALUES ('Nature'), ('Video'), ('Documentary'), ('Landscape');

INSERT INTO MediaItemTags (media_id, tag_id) VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 1),
(2, 3);