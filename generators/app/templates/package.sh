#!/bin/sh

# Create main
cd ./ && mkdir main


### Export demo data
cd ./main/ && mkdir demo-content
wp export --dir=../main/demo-content --post_type="post" --filename_format=<%=projectName%>-post.xml
wp export --dir=../main/demo-content --post_type="pages" --filename_format=<%=projectName%>-pages.xml
wp export --dir=../main/demo-content  --filename_format=<%=projectName%>-all-content.xml

## Demo data 1
wp option get theme_options --format=json  > ../wp-content/themes/<%=projectName%>/admin/redux-extensions/extensions/wbc_importer/demo-data/demo1/theme-options.txt
wp export --dir=../wp-content/themes/<%=projectName%>/admin/redux-extensions/extensions/wbc_importer/demo-data/demo1/  --filename_format=content.xml
wp eval-file ../sh/sidebar-export.php  > ../wp-content/themes/<%=projectName%>/admin/redux-extensions/extensions/wbc_importer/demo-data/demo1/widgets.json

### Make sure you update own plugins when you packaged
#cd ./wp-content/plugins/
#zip -r envato-wordpress-toolkit-master.zip  envato-wordpress-toolkit-master/ -x "*DS_Store*"
#mv envato-wordpress-toolkit-master.zip ../themes/<%=projectName%>/inc/plugin-activation/plugins/envato-wordpress-toolkit-master.zip
#cd ../../

## Build assets
gulp build

### Create theme compressed
cd ./main/ && mkdir Theme-file
cd ../
cd ./wp-content/themes/
zip -r wpautomate.zip wpautomate/ -x "*DS_Store*"
mv wpautomate.zip ../../main/Theme-file/wpautomate.zip
cd ../../

## Creating documentation
zip -r documentation.zip  documentation/ -x "*DS_Store*"
mv documentation.zip main/documentation/documentation.zip

## Creating main package

zip -r main.zip main/ -x "*DS_Store*"

