#!/bin/sh

# Latest wordpress download
wp core download

#Checking ENV DBUSER and DBPASS exist
if [ -f $DBUSER ] &&  [ -f  $DBPASS ]; then
  echo 'ENV Properly not configured for DB details';
  echo 'Visit this url for how you configure: https://goo.gl/uPyf3q'
  exit 1;
else
  echo '--------------------';
  echo 'ENV successfully configured.'
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
wp plugin install wordpress-importer
wp plugin activate wordpress-importer

# Restore DB
wp db  import db/db.txt

# Create a submodule for upload dir

echo '------------------------';
echo 'Project setup completed.';
echo
