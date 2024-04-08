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

DROP TABLE IF EXISTS letter;

DROP TABLE IF EXISTS keyword;

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

CREATE TABLE letter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(30) NOT NULL,
    resume_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    job VARCHAR(100) NOT NULL,
    content JSON NOT NULL,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES member(email) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE CASCADE
);

CREATE TABLE keyword (
    id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(100) NOT NULL UNIQUE,
    keyword JSON NOT NULL
);

/* 테이블 조회 */
SHOW TABLES;

DESCRIBE member;

DESCRIBE resume;

DESCRIBE letter;

DESCRIBE keyword;

/* 테이블 설정 변경 */
ALTER TABLE member AUTO_INCREMENT = 1;

ALTER TABLE resume AUTO_INCREMENT = 1;

ALTER TABLE letter AUTO_INCREMENT = 1;

ALTER TABLE keyword AUTO_INCREMENT = 1;

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

/* letter CRUD */
INSERT INTO letter (email, resume_id, title, company, job, content)
VALUES (
        '1@test.com',
        1,
        'test letter 01',
        'test company',
        'test job',
        '{"category": "지원동기", "content": "지원동기 내용입니다."}'
    );
    
SELECT id,
    title,
    UNIX_TIMESTAMP(modified) AS modified
FROM letter
WHERE email = '1@test.com'
ORDER BY modified DESC;

UPDATE letter
SET title = 'test letter 02',
    company = 'test company 02',
    job = 'test job 02',
    content = '{"category": "지원동기", "content": "수정된 지원동기 내용입니다."}',
    modified = NOW()
WHERE id = 1;

DELETE FROM letter
WHERE id = 1;

/* keyword CRUD */
INSERT INTO keyword (company, keyword)
VALUES ('abc', '{"a", "b", "c"}');

SELECT id, company, keyword FROM keyword;

UPDATE keyword
SET keyword = '{"a", "b", "c", "d"}'
WHERE company = 'abc';

DELETE FROM keyword
WHERE company = 'abc';
