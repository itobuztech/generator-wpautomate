#!/bin/sh

wp db drop --yes
wp db create
wp core install --url="<%=siteUrl%>" --title="<%=projectName%>" --admin_user="<%=adminUser%>" --admin_password="<%=adminPass%>" --admin_email="<%=authorEmail%>"
wp theme activate <%=projectName%>
<% if (testData)  { %>
#Install demo data
wp import ./sh/wptest.xml --authors=create
<% } %>
