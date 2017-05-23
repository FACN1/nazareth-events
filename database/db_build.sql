BEGIN;

DROP TABLE IF EXISTS EVENTS, ORGANIZERS cascade;

CREATE TABLE ORGANIZERS(
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE EVENTS(
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  location TEXT NOT NULL,
  organizer VARCHAR(30) REFERENCES ORGANIZERS(username) NOT NULL,
  start_time timetz NOT NULL,
  end_time timetz NOT NULL,
  cost MONEY,
  date DATE NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  img_url VARCHAR(200)
);

INSERT INTO ORGANIZERS(username, password) VALUES ('ChocolateLover','chocochocorune');

INSERT INTO EVENTS(title, location, organizer, start_time, end_time,
   cost, date, type, description, img_url)
VALUES ('Coated Waffer Chocolate Super Sale','Nazareth', 'ChocolateLover',
'9:00', '19:00', '15', '03/03/2011', 'sale', 'JUST DO IT', '');


COMMIT;
