CREATE DATABASE IF NOT EXISTS todo;

CREATE TABLE IF NOT EXISTS todo.users (
  id int(11) NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(100) NOT NULL
) AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO todo.users (id, username, password, email) VALUES (1, 'test', 'test', 'test@test.com');

ALTER TABLE todo.users ADD PRIMARY KEY (`id`);
ALTER TABLE todo.users MODIFY id int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

CREATE TABLE IF NOT EXISTS todo.tasks(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    task TEXT NOT NULL,
    completed BOOLEAN NOT NULL,
    userId int NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id)
);
