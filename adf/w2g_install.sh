#!/bin/sh

if [[ $#<=0 ]]; then
    echo "输入参数doamin/ip和port,如: www.evildo.com 8000 / 192.168.2.22 8000"
    echo "(不使用域名的话则走http协议),payload/w2g.js需要修改为http://"
    exit 1
fi

host=$1
port=$2

#安装系统依赖
sudo apt update
sudo apt install python-dev nginx mysql-server libmysqlclient-dev  certbot -y
echo "尝试为${host}申请SSL证书"
certbot certonly --standalone -d ${host}

wget https://bootstrap.pypa.io/get-pip.py
sudo python get-pip.py
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

#安装python环境
sudo pip install uwsgi pymysql charset Django==1.3.1   

#获取mysql账号密码,并导入数据库和替换settings.py
user=`(sudo cat /etc/mysql/debian.cnf | grep user | cut -d "=" -f 2 | awk '$1=$1')`
passwd=`(sudo cat /etc/mysql/debian.cnf | grep password | cut -d "=" -f 2 | awk '$1=$1')`
sed -i "s/{USER}/${user}/g" ui/settings.py
sed -i "s/{PASSWORD}/${passwd}/g" ui/settings.py

`mysql -u ${user} -p ${passwd} web2ghost < ui/w2g.sql`

#替换对应文件中的host和port
sed -i "s/{IP}/${host}/g" ui/payloads/w2g.js
sed -i "s/{PORT}/${port}/g" ui/payloads/w2g.js

#启动w2g
echo "证书目录为默认目录: /etc/letsencrypt/live/${host}"
echo "启动w2g后, 默认账号密码为admin/admin,登入后请修改为强密码"
echo "启动方式为python manager.py 0.0.0.0:${port}"
echo "或者启动nginx，并使用uwsgi uwsgi.ini --chmod-socket=666 启动django"
#sudo python w2g/manager.py 0.0.0.0:${port}

#坑点日志1 使用了uswgi后，mysql连接报错提示ERROR 1698 (28000): Access denied for user 'root'@'localhost'
#解决方法：登录进mysql后
#1： USE mysql;SELECT User, Host, plugin FROM mysql.user;
#    如果看到root对应的plugin是auth_socket，则需要进行修改
#
#2: UPDATE user SET plugin='mysql_native_password' WHERE User='root';FLUSH PRIVILEGES;
#   修改为mysql_native_password
#
#3: sudo service mysql restart
#   重启服务后即可恢复正常的数据库连接

#坑点日志2 django1.4之前的版本不会生成wsgi.py，运行uswgi总是报错，要自己添加wsgi.py

#坑点日志3 部署https的问题踩坑，include    /etc/nginx/uwsgi_params; 这条语句一定要加上，否则会报错。
#使用uwsgi转发请求的话不需要安装django-Secure  
#            
#坑点日志4 证书的时候使用指令 sudo ./certbot-auto  certonly --standalone -d {host}，默认
#git clone https://github.com/certbot/certbot
# cd certbot
# ./certbot-auto --help
#sudo ./certbot-auto  certonly --standalone -d {host} 
#    ssl_certificate /etc/letsencrypt/live/{host}/fullchain.pem;
#    ssl_certificate_key /etc/letsencrypt/live/{host}/privkey.pem;
#    ssl_trusted_certificate /etc/letsencrypt/live/{host}/fullchain.pem;
