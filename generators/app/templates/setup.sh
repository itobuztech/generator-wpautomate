#!/bin/sh

# Setting permission
chmod 775 ./sh/package.sh;
chmod 775 ./sh/reset.sh;
chmod 775 ./sh/sidebar-export.php;
chmod 775 ./sh/deploy.sh;
chmod 775 ./sh/config.sh;

# Latest wordpress download
wp core download


#Checking ENV DBUSER and DBPASS exist
if [ -f $DBUSER ] &&  [ -f  $DBPASS ]; then
  echo 'ENV Properly not configured for DB details';
  echo 'Visit this url for how you configure: https://goo.gl/uPyf3q';
  echo -n "Enter DB user?\n"
  read DBUSER;
  echo -n "Enter DB Password?\n"
  read DBPASS;
fi;

if [ -f $DBUSER ] &&  [ -f  $DBPASS ]; then
  echo 'Please enter DB details.';
  exit 1;
else
  echo '--------------------';
  echo 'DB Details.'
  echo 'DB User:' $DBUSER;
  echo 'DB Password:' $DBPASS;
  echo '---------------------';
fi;

# Generate wp-config.php
wp core config --dbname=<%=dbName%> --dbuser=$DBUSER --dbpass=$DBPASS --dbhost=localhost;

wp db drop --yes
wp db create
wp core install --url="<%=siteUrl%>" --title="<%=projectName%>" --admin_user="<%=adminUser%>" --admin_password="<%=adminPass%>" --admin_email="<%=authorEmail%>"
wp theme activate <%=projectName%>
wp plugin delete hello
wp plugin delete akismet
wp theme delete twentyfifteen
wp theme delete twentyfourteen
wp theme delete twentysixteen
wp theme delete twentyseventeen
wp plugin install wordpress-importer
wp plugin activate wordpress-importer
<% if (childTheme)  { %>
wp scaffold child-theme <%=projectName%>-child --parent_theme=<%=projectName%>
<% } %>
<% if (testData)  { %>
#Install demo data
wp import ./sh/wptest.xml --authors=create
<% } %>

# Create a submodule for upload dir
cd wp-content/uploads/;

  if [ -d .git ]; then
    echo 'uploads dir already git repo';
  else
    touch .gitkeep;
    git init;
    git add .;
    git commit -m "init";
    git remote add origin <%=subrepoUploads%>;
    echo '------------------------';
    echo 'git submoudle created for wp-content/uploads';
    echo '------------------------';
    sleep 30;
  fi;
  # go back to root
  cd ../../;

# Create a git repo if blank
# init all files with commit msg
if [ -d .git ]; then
 echo 'already git repo';
  echo 'Try removing wp-content/uploads if you want to pull uploads.';
  echo 'run `rm -rf wp-content/uploads';
  echo 'then `git submodule init`';
  echo 'then `git submodule update`';
  echo 'then `wp db import db/db.txt';
  sleep 30;
else
  git init;
  git submodule add <%=subrepoUploads%> wp-content/uploads/
  git remote add origin <%=repoUrl%>;
  git add .
fi;




echo '------------------------';
echo 'Project setup completed.';
echo 'Site URL: <%=siteUrl%>';
echo '------------------------';
