/* root 계정으로 접속 */
SHOW DATABASES;

ALTER USER 'root' undefined IDENTIFIED BY '{MYSQL_ROOTPW}';

CREATE DATABASE resumate;

CREATE USER '{MYSQL_USERNAME}' undefined IDENTIFIED BY '{MYSQL_password}';

GRANT ALL PRIVILEGES ON resumate.* TO '{MYSQL_USERNAME}' undefined;

FLUSH PRIVILEGES;

/* kosmo 계정으로 접속 */
DROP TABLE IF EXISTS member;

DROP TABLE IF EXISTS resume;

/* 테이블 생성 */
CREATE TABLE member (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
);

CREATE TABLE resume (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(30) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES member(email) ON DELETE CASCADE
);

/* 테이블 조회 */
SHOW TABLES;

DESCRIBE member;

DESCRIBE resume;

/* 테이블 설정 변경 */
ALTER TABLE member AUTO_INCREMENT = 1;

ALTER TABLE resume AUTO_INCREMENT = 1;

ALTER TABLE resume
MODIFY COLUMN modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

/* member CRUD */
INSERT INTO member (email, password)
VALUES ('1@test.com', '1111');

SELECT password
FROM member
WHERE email = '1@test.com';

UPDATE member
SET password = '2222'
WHERE email = '1@test.com';

DELETE FROM member
WHERE email = '1@test.com';

/* resume CRUD */
INSERT INTO resume (email, title, content, modified)
VALUES (
        '01@test.com',
        'test resume 01',
        '{"title": "test 01 resume", "content": "hello"}',
        NOW()
    );

SELECT id,
    title,
    UNIX_TIMESTAMP(modified) AS modified
FROM resume
WHERE email = #{email} ORDER BY modified DESC

UPDATE resume
SET title = 'test resume 02',
    content = '{"message":"hello"}',
    modified = NOW()
WHERE id = 1;

DELETE FROM resume
WHERE id = 1;