## Installing project in remote
1. `git clone [repo url]`. Need ssh connection
2. `wp core download`
3. `wp core config --dbname=<%=dbName%> --dbuser=<%=dbUser%> --dbpass=<%=dbPass%> --dbhost=<%=dbHost%>`
4. `wp db create`
5. `wp core install --url="<%=siteUrl%>" --title="<%=projectName%>" --admin_user="<%=adminUser%>" --admin_password="<%=adminPass%>" --admin_email="<%=authorEmail%>"` If you want to install fress wordpress. If not you can skip this point. 
6. `wp theme activate <%=projectName%>`
7. `wp plugin delete hello`
8. `wp plugin delete akismet`
9. `wp theme delete twentyfifteen`
10. `wp theme delete twentyfourteen`
11. `wp theme delete twentysixteen`
12. Install wp org plugins with wp cli. All wp org plugin dependency should be listed in setup.sh. This will be usefull for new user who want to setup the project.
13. If you skip "5" : Import db with wp cli `wp db import [db path]


## Before deployment
1. Db should be backup with wp cli `wp db export [db path]
2. Site URL will be same with your local computer and remote computer. This can be easyly done by changing host file / vertual host
3. Before deployment run `gulp build` this will removed all sourcemaps.


## Deployment with SSH
1. ssh-add [keyfile-path]
2. Change key file permission to 400 by `sudo chmod 400 [keyfile-path]`. This is one time 
3. `ssh username@hostname` for login
4. go to project dir `cd [project path]
5. Synch your project with git `git pull --rebase origin master`
6. Restore database with `wp db import [db path]`. Note db .txt extention recomended. Because .sql is bainary file.
7. Please check remote site once. Ensure all functality works smoothly.



