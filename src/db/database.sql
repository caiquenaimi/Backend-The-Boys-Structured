CREATE DATABASE theboys;

CREATE TABLE heroes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    skill VARCHAR(100) NOT NULL,
    power INT NOT NULL,
    level SMALLINT NOT NULL,
    health INT NOT NULL,
    winsCounter INT
);

CREATE TABLE battles (
    id SERIAL PRIMARY KEY,
    hero1_id INT NOT NULL,
    hero2_id INT NOT NULL,
    winner_id INT NOT NULL,
    loser_id INT NOT NULL,
    FOREIGN KEY (hero1_id) REFERENCES heroes(id),
    FOREIGN KEY (hero2_id) REFERENCES heroes(id)
);