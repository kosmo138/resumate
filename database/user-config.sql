ALTER USER 'root'@'localhost' IDENTIFIED BY '<PASSWORD>';
CREATE DATABASE resumate;
CREATE USER '<username>'@'%' IDENTIFIED BY '<PASSWORD>';
GRANT ALL PRIVILEGES ON resumate.* TO 'kosmo'@'%';
FLUSH PRIVILEGES;
