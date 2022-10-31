-- migrate:up
CREATE TABLE images(
    id INT NOT NULL AUTO_INCREMENT,
    path VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE images;
