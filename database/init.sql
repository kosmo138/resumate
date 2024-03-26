/* root 계정으로 접속 */
SHOW DATABASES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '{MYSQL_ROOTPW}';
CREATE DATABASE resumate;
CREATE USER '{MYSQL_USERNAME}'@'%' IDENTIFIED BY '{MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON resumate.* TO '{MYSQL_USERNAME}'@'%';
FLUSH PRIVILEGES;

/* kosmo 계정으로 접속 */
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS resume;

CREATE TABLE member (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resume (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(30) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES member(email) ON DELETE CASCADE
);

SHOW TABLES;

DESCRIBE member;
DESCRIBE resume;

SELECT * FROM member;
SELECT * FROM resume;

INSERT INTO member (email, password) VALUES ('test@test.com', 'TEST_PASSWORD');
INSERT INTO resume (email, title, content, modified) VALUES ('1@test.com', '테스트 이력서 제목', '테스트 이력서 내용', NOW());

UPDATE resume SET title = '테스트 이력서 제목 - 수정', content = '테스트 이력서 내용 - 수정' WHERE id = 1;

ALTER TABLE member AUTO_INCREMENT = 1;
ALTER TABLE resume AUTO_INCREMENT = 1;

DELETE FROM resume WHERE 1 = 1;
DELETE FROM member WHERE 1 = 1;

INSERT INTO resume (email, title, content) VALUES ("01@test.com", "test resume 01", "{}");
UPDATE resume SET title = "test 02 resume", content = '{"message":"hello"}', modified = NOW() WHERE id = 1;
