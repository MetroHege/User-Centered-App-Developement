DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

-- Create tables
CREATE TABLE UserLevel(
  user_level_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_level VARCHAR(255) NOT NULL
);

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Comments(
  comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  media_id INT NOT NULL,
  comment VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id)
);

-- add users
INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);
INSERT INTO Users VALUES (110, 'Dragon', 'salasana', 'info@metris.fi', 3, null);
SELECT * FROM Users;

-- add user levels
INSERT INTO UserLevel (user_level) VALUES ('user'), ('manager'), ('admin');
SELECT * FROM UserLevel;

-- add media files
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg', null),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg', null),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg', null),
         ('t39fh8.gif', 35743, 'Coffee room', null, 110, 'coffee/gif', null);
SELECT * FROM MediaItems;

-- add comments
INSERT INTO Comments (user_id, media_id, comment, created_at)
  VALUES (260, 1, 'Nice drink', null),
         (305, 2, 'Nice photo', null),
         (110, 3, 'WOW!', null),
         (260, 4, 'What a nice office', null);
SELECT * FROM Comments;

-- update user level
UPDATE Users SET user_level_id = 2 WHERE user_id = 260;
SELECT * FROM Users;

-- update comment
UPDATE Comments SET comment = 'Is it really you Miika?' WHERE comment_id = 2;
SELECT * FROM Comments WHERE comment_id = 2;

-- update title
UPDATE MediaItems SET title = 'New title' WHERE media_id = 3;
SELECT * FROM MediaItems;

-- delete media item
-- Create a temporary table to store comments related to media item with media_id = 3
CREATE TEMPORARY TABLE TempComments AS
SELECT comment_id
FROM Comments
WHERE media_id = 3;

-- Delete the comments related to media item with media_id = 3
DELETE FROM Comments
WHERE comment_id IN (SELECT comment_id FROM TempComments);

-- Delete the media item with media_id = 3
DELETE FROM MediaItems
WHERE media_id = 3;

-- Clean up the temporary table
DROP TEMPORARY TABLE TempComments;

-- Verify the results
SELECT * FROM MediaItems;
