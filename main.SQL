--  create 
--  \! clear
--  \l  hamma malumotlar bazasini ko'rish


CREATE Table "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  age INTEGER,
  email VARCHAR(50) UNIQUE,
  
);


INSERT INTO "user" (name, age, email) VALUES('azim', 18, 'azim@gmail.com') RETURning*;



--