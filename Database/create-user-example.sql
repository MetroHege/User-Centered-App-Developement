CREATE USER 'mediashare'@'localhost' IDENTIFIED BY 'Salasana1';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'mediashare'@'localhost';
FLUSH PRIVILEGES;