CREATE DATABASE IF NOT EXISTS fishFinder;

USE fishFinder;

CREATE TABLE IF NOT EXISTS fish (
  id INT AUTO_INCREMENT,
  name VARCHAR(30),
  location VARCHAR(20),
  shadowsize VARCHAR(10),
  price INT,
  hours CHAR(24),
  months CHAR(12),
  PRIMARY KEY (id)
);

LOAD DATA LOCAL INFILE '/Users/jackson/repos/fishFinder/database/fish.csv'
INTO TABLE fish
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
  name VARCHAR(20),
  fish1 BOOLEAN DEFAULT false,
  fish2 BOOLEAN DEFAULT false,
  fish3 BOOLEAN DEFAULT false,
  fish4 BOOLEAN DEFAULT false,
  fish5 BOOLEAN DEFAULT false,
  fish6 BOOLEAN DEFAULT false,
  fish7 BOOLEAN DEFAULT false,
  fish8 BOOLEAN DEFAULT false,
  fish9 BOOLEAN DEFAULT false,
  fish10 BOOLEAN DEFAULT false,
  fish11 BOOLEAN DEFAULT false,
  fish12 BOOLEAN DEFAULT false,
  fish13 BOOLEAN DEFAULT false,
  fish14 BOOLEAN DEFAULT false,
  fish15 BOOLEAN DEFAULT false,
  fish16 BOOLEAN DEFAULT false,
  fish17 BOOLEAN DEFAULT false,
  fish18 BOOLEAN DEFAULT false,
  fish19 BOOLEAN DEFAULT false,
  fish20 BOOLEAN DEFAULT false,
  fish21 BOOLEAN DEFAULT false,
  fish22 BOOLEAN DEFAULT false,
  fish23 BOOLEAN DEFAULT false,
  fish24 BOOLEAN DEFAULT false,
  fish25 BOOLEAN DEFAULT false,
  fish26 BOOLEAN DEFAULT false,
  fish27 BOOLEAN DEFAULT false,
  fish28 BOOLEAN DEFAULT false,
  fish29 BOOLEAN DEFAULT false,
  fish30 BOOLEAN DEFAULT false,
  fish31 BOOLEAN DEFAULT false,
  fish32 BOOLEAN DEFAULT false,
  fish33 BOOLEAN DEFAULT false,
  fish34 BOOLEAN DEFAULT false,
  fish35 BOOLEAN DEFAULT false,
  fish36 BOOLEAN DEFAULT false,
  fish37 BOOLEAN DEFAULT false,
  fish38 BOOLEAN DEFAULT false,
  fish39 BOOLEAN DEFAULT false,
  fish40 BOOLEAN DEFAULT false,
  fish41 BOOLEAN DEFAULT false,
  fish42 BOOLEAN DEFAULT false,
  fish43 BOOLEAN DEFAULT false,
  fish44 BOOLEAN DEFAULT false,
  fish45 BOOLEAN DEFAULT false,
  fish46 BOOLEAN DEFAULT false,
  fish47 BOOLEAN DEFAULT false,
  fish48 BOOLEAN DEFAULT false,
  fish49 BOOLEAN DEFAULT false,
  fish50 BOOLEAN DEFAULT false,
  fish51 BOOLEAN DEFAULT false,
  fish52 BOOLEAN DEFAULT false,
  fish53 BOOLEAN DEFAULT false,
  fish54 BOOLEAN DEFAULT false,
  fish55 BOOLEAN DEFAULT false,
  fish56 BOOLEAN DEFAULT false,
  fish57 BOOLEAN DEFAULT false,
  fish58 BOOLEAN DEFAULT false,
  fish59 BOOLEAN DEFAULT false,
  fish60 BOOLEAN DEFAULT false,
  fish61 BOOLEAN DEFAULT false,
  fish62 BOOLEAN DEFAULT false,
  fish63 BOOLEAN DEFAULT false,
  fish64 BOOLEAN DEFAULT false,
  fish65 BOOLEAN DEFAULT false,
  fish66 BOOLEAN DEFAULT false,
  fish67 BOOLEAN DEFAULT false,
  fish68 BOOLEAN DEFAULT false,
  fish69 BOOLEAN DEFAULT false,
  fish70 BOOLEAN DEFAULT false,
  fish71 BOOLEAN DEFAULT false,
  fish72 BOOLEAN DEFAULT false,
  fish73 BOOLEAN DEFAULT false,
  fish74 BOOLEAN DEFAULT false,
  fish75 BOOLEAN DEFAULT false,
  fish76 BOOLEAN DEFAULT false,
  fish77 BOOLEAN DEFAULT false,
  fish78 BOOLEAN DEFAULT false,
  fish79 BOOLEAN DEFAULT false,
  fish80 BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

 CREATE TABLE IF NOT EXISTS sessions (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          hash VARCHAR(64),
          userId INT);

INSERT INTO USERS (name) VALUES ('default');