#!/bin/bash

# EC2에서 포트 포워딩 설정 -> TCP 3306 요청을 RDS MySQL 데이터베이스로 전달합니다

# 참고 문서: https://hons.io/how-to-ufw-port-forward/

# UFW 3306 포트 포워딩 설정
sudo -s
ufw allow 3306
ufw route allow proto tcp from any to {RDS_ENDPOINT} port 3306
ufw status

# 시작

# Status: active

# To                         Action      From
# --                         ------      ----
# 22/tcp                     ALLOW       Anywhere
# 22                         ALLOW       Anywhere
# 443                        ALLOW       Anywhere
# 8080                       ALLOW       Anywhere
# 80                         ALLOW       Anywhere
# 3306                       ALLOW       Anywhere
# 22/tcp (v6)                ALLOW       Anywhere (v6)
# 22 (v6)                    ALLOW       Anywhere (v6)
# 443 (v6)                   ALLOW       Anywhere (v6)
# 8080 (v6)                  ALLOW       Anywhere (v6)
# 80 (v6)                    ALLOW       Anywhere (v6)
# 3306 (v6)                  ALLOW       Anywhere (v6)

# 172.31.64.78 3306/tcp      ALLOW FWD   Anywhere

# 끝

vim /etc/default/ufw
# DEFAULT_FORWARD_POLICY="ACCEPT"

vim /etc/ufw/sysctl.conf
# net/ipv4/ip_forward=1
# net/ipv6/conf/default/forwarding=1
# net/ipv6/conf/all/forwarding=1

vim /etc/ufw/before.rules

# 시작

#   ufw-before-output
#   ufw-before-forward
#

# 아래의 내용을 추가 (주석 해제)
# NAT
# *nat
# :PREROUTING ACCEPT [0:0]
# -A PREROUTING -i eth0 -p tcp --dport 3306 -j DNAT --to-destination 172.31.64.78:3306
# -A PREROUTING -i eth1 -p tcp --dport 3306 -j DNAT --to-destination 172.31.64.78:3306
# -A POSTROUTING -j MASQUERADE

# 이하 내용은 기존과 동일
# COMMIT

# Don't delete these required lines, otherwise there will be errors

# 끝

ufw reload

iptables -t nat -L -v

# 정책 적용 확인

# 시작

# Chain PREROUTING (policy ACCEPT 0 packets, 0 bytes)
#  pkts bytes target     prot opt in     out     source               destination
#     0     0 DNAT       tcp  --  eth0   any     anywhere             anywhere             tcp dpt:mysql to:172.31.64.78:3306
#     0     0 DNAT       tcp  --  eth1   any     anywhere             anywhere             tcp dpt:mysql to:172.31.64.78:3306

# Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
#  pkts bytes target     prot opt in     out     source               destination

# Chain OUTPUT (policy ACCEPT 0 packets, 0 bytes)
#  pkts bytes target     prot opt in     out     source               destination

# Chain POSTROUTING (policy ACCEPT 0 packets, 0 bytes)
#  pkts bytes target     prot opt in     out     source               destination
#    14  1016 MASQUERADE  all  --  any    any     anywhere             anywhere

# 끝

reboot

# 이후 로컬 PC에서 EC2 Public IPv4 주소를 입력하여 RDS에서 실행 중인 MySQL에 접속
mysql -h {MYSQL_ENDPOINT} -D {MYSQL_DBNAME} -u {MYSQL_USERNAME} -p
# Enter password: {MYSQL_PASSWORD}
