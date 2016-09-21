# Create new project with generator-wp-automate

* Create the new directory in your apache document root or your choices.
* `cd {your directory}` Enter your project directory
* `yo wp-automate` to generate WordPress project structure
* Select appropriate options from generator prompt
* After all options selected `npm install && bower install` will run automatically
* If this failed you can run manually
* After npm and bower successfully installed `gulp wpSetup` will run
* If npm instal && bower install failed then `gulp wpSetup` will not run automatically. You have to run manually. This will generate all project structure.
 

 ### Common errors
 Sometimes theme install task stoped for git repo clone error. If you face this problem you have to manually clone public / private repo.

 #### Repo Url
 * Public Repo : https://github.com/developer-prosenjit/wpautomate.git
 * Private Repo : git@bitbucket.org:itobuztech/wp-automate.git

 ### Setup Process 
 * `git clone --depth=1 {repo url} ./wp-content/themes/wpautomate`
 * `gulp wp-rp`
 * `chmod 775 ./sh/setup.sh`
 * `./sh/setup.sh`
