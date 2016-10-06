#!/bin/sh
wp core download
wp core config --dbname=<%=dbName%> --dbuser=<%=dbUser%> --dbpass=<%=dbPass%> --dbhost=<%=dbHost%>
wp db create
wp core install --url="<%=siteUrl%>" --title="<%=projectName%>" --admin_user="<%=adminUser%>" --admin_password="<%=adminPass%>" --admin_email="<%=authorEmail%>"
wp theme activate <%=projectName%>
wp plugin delete hello
wp plugin delete akismet
wp theme delete twentyfifteen
wp theme delete twentyfourteen
wp theme delete twentysixteen

# Create a git repo if blank
if [ -d .git ]; then
  echo 'already git repo';
else
  git init;
  git add .
  git commit -m "init";
fi;

# Create a submodule for upload dir

