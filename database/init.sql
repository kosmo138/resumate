SHOW DATABASES;
/* 
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)
 */

/* 로컬에서 root 계정으로 접속 */
ALTER USER 'root'@'localhost' IDENTIFIED BY '{MYSQL_ROOTPW}';
CREATE DATABASE resumate;
CREATE USER '{MYSQL_USERNAME}'@'%' IDENTIFIED BY '{MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON resumate.* TO '{MYSQL_USERNAME}'@'%';
FLUSH PRIVILEGES;

/* 원격에서 kosmo 계정으로 접속 */
CREATE TABLE member (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resume (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(id)
);

INSERT INTO member (email, password) VALUES ('test@test.com', '$$kosmo138$$');
INSERT INTO resume (member_id, title) VALUES (1, '테스트 이력서 제목');

SELECT * FROM member;
SELECT * FROM resume;