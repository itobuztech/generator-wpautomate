#!/bin/sh
wp core download
wp core config --dbname=<%=dbName%> --dbuser=<%=dbUser%> --dbpass=<%=dbPass%> --dbhost=<%=dbHost%>
wp db create
wp core install --url="<%=siteUrl%>" --title="<%=projectName%>" --admin_user="<%=projectName%>" --admin_password="<%=projectName%>" --admin_email="<%=authorEmail%>"
wp theme activate <%=projectName%>
wp plugin delete hello
wp plugin delete akismet
wp theme delete twentyfifteen
wp theme delete twentyfourteen
wp theme delete twentysixteen