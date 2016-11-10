#!/bin/sh

# Create main
mkdir main && mkdir package


### Export demo data
cd ./main/ && mkdir demo-content
wp export --dir=../main/demo-content --post_type="post" --filename_format=<%=projectName%>-post.xml
wp export --dir=../main/demo-content --post_type="page" --filename_format=<%=projectName%>-pages.xml
wp export --dir=../main/demo-content  --filename_format=<%=projectName%>-all-content.xml


<% if (themerepo==='bitbucket')  { %>
## Demo data 1
wp option get theme_options --format=json  > ../wp-content/themes/<%=projectName%>/admin/redux-extensions/extensions/wbc_importer/demo-data/demo1/theme-options.txt
wp export --dir=../wp-content/themes/<%=projectName%>/admin/redux-extensions/extensions/wbc_importer/demo-data/demo1/  --filename_format=content.xml
wp eval-file ../sh/sidebar-export.php  > ../wp-content/themes/<%=projectName%>/admin/redux-extensions/extensions/wbc_importer/demo-data/demo1/widgets.json
<% } %>
cd ../

### Make sure you update own plugins when you packaged
#cd ./wp-content/plugins/
#zip -r envato-wordpress-toolkit-master.zip  envato-wordpress-toolkit-master/ -x "*DS_Store*"
#mv envato-wordpress-toolkit-master.zip ../themes/<%=projectName%>/inc/plugin-activation/plugins/envato-wordpress-toolkit-master.zip
#cd ../../

## Build assets
gulp build

## Create Versions
# This will update theme stylesheet version
# Also update package.json version
gulp ver

### Create theme compressed
mkdir main
cd ./main/ && mkdir Theme-file
cd ../
cd ./wp-content/themes/
zip -r wpautomate.zip wpautomate/ -x "*DS_Store*"
mv wpautomate.zip ../../main/Theme-file/wpautomate.zip
cd ../../

# Create child theme
wp scaffold child-theme wpautomate-child --parent_theme=wpautomate --author=<%=authorName%> --force
#--author_uri=<%=authorName%> --theme_uri=<%=authorName%>
cd ./wp-content/themes/
zip -r wpautomate-child.zip wpautomate-child/ -x "*DS_Store*"
mv wpautomate-child.zip ../../main/Theme-file/wpautomate-child.zip
cd ../../

## Creating documentation
cd ./main/
mkdir documentation
cd ../
zip -r documentation.zip  documentation/ -x "*DS_Store*"
mv documentation.zip main/documentation/documentation.zip

## Creating main package
zip -r main.zip main/ -x "*DS_Store*"

# Move created package to new version dir
gulp ver:package
gulp ver:tags
