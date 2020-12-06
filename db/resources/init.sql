CREATE DATABASE IF NOT EXISTS todo;
CREATE TABLE IF NOT EXISTS todo.todolist(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    item TEXT NOT NULL,
    completed BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS todo.accounts (
  id int(11) NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(100) NOT NULL
) AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO todo.accounts (id, username, password, email) VALUES (1, 'test', 'test', 'test@test.com');

ALTER TABLE todo.accounts ADD PRIMARY KEY (`id`);
ALTER TABLE todo.accounts MODIFY id int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;