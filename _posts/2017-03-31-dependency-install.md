---
title: Install dependency first
description: Install dependency first for generator-wpautomate
header: Install dependency first

categories: [testing, sticky]

---

<a href="https://www.youtube.com/watch?v=LQcaeldygc8" target="_blank">
<img class="image-left" src="https://img.youtube.com/vi/LQcaeldygc8/0.jpg">
</a>

Installtion script in ubuntu 16.10

```sh
sudo apt install apache2
sudo systemctl status apache2.service
sudo netstat -tlpn
sudo a2enmod ssl 
sudo a2ensite default-ssl.conf 
sudo systemctl restart apache2.service
sudo netstat -tlpn
sudo systemctl enable apache2
sudo apt search php7.0
sudo apt install php7.0 libapache2-mod-php7.0 php7.0-mysql php7.0-xml php7.0-gd
php -v
#sudo nano /var/www/html/info.php
#<?php 
#phpinfo();
#?>
sudo systemctl restart apache2
sudo apt install php7.0-mysql mariadb-server mariadb-client
sudo mysql_secure_installation
#$ sudo mysql 
#MariaDB> use mysql;
#MariaDB> update user set plugin='' where User='root';
#MariaDB> flush privileges;
#MariaDB> exit
#mysql -u root -p
sudo apt install php-gettext phpmyadmin
## Skip dbconfig common 
sudo gedit /etc/apache2/apache2.conf
# Add  new line at the end of the file 
Include /etc/phpmyadmin/apache.conf
sudo systemctl restart apache2
# Now check phpmyadmin working

## Install wp cli 
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp
wp --info

## Install node 
## NVM doc 
## https://github.com/creationix/nvm#install-script
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
# Verify instalation of nvm
command -v nvm
## Restart terminal
sudo npm install -g npm
sudo npm install -g bower
sudo npm install -g gulp
sudo npm install -g jshint
sudo npm install -g yo
sudo npm install -g generator-wp-automate

## Install git 
sudo apt-get install git

## Sublime (optional)
sudo add-apt-repository ppa:webupd8team/sublime-text-3
sudo apt-get update
sudo apt-get install sublime-text-installer

## Install visual code (optional)
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64] http://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'

sudo apt-get update
sudo apt-get install code


## Package install (optional)
## GO >> https://gist.github.com/developer-prosenjit/0e552d1e1fa850dfb5507d40e665e0ee

## Install phpcs (optional)
#https://gist.github.com/developer-prosenjit/7d8539c711ac5f76bd0199dca8f9c032
```
