---
title: Change apache default config
description: Change apache default config to obstacle permission issue
header: Change apache default config
---
<a href="https://www.youtube.com/watch?v=YMyRqh5BgTs" target="_blank">
<img class="image-left" src="https://img.youtube.com/vi/YMyRqh5BgTs/0.jpg">
</a>

In Unix system for apache have different permissions group. And for this reason, every time I have to change permission. You can easily change some config for this issues. I specifically place all project in the same directory. For this reason, I change some apache config. 

* Change apache default user
* CHange apache default path

## Enable permalink
Wordpress have pretty permalink features. default it's disabled. 

```
a2enmod rewrite
sudo gedit /etc/apache2/apache2.conf

```

And change `AllowOverride None` to `AllowOverride All`

Then Run 
`service apache2 restart`