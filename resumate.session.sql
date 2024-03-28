CREATE TABLE companies(
  company_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255),
  website_url TEXT,
  related_words JSON
);

DROP TABLE companies;
COMMIT;

CREATE TABLE keyword (
    id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(40) NOT NULL UNIQUE,
    keyword JSON NOT NULL
);

INSERT INTO keyword (company, keyword) VALUES('삼성전자', '["책임", "성실", "열정"]');
INSERT INTO keyword (company, keyword) VALUES('LG전자', '["노력", "꾸준함", "패기"]');

SELECT * FROM keyword;

DELETE FROM keyword;

