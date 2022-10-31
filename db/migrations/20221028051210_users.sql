-- migrate:up
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(200),
    email VARCHAR(200),
    platform_id INT DEFAULT 1,
    platform_member_id BIGINT UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (platform_id) REFERENCES platforms (id)
);

-- migrate:down
DROP TABLE users;
