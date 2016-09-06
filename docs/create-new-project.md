# Create new project with generator-wp-automate

* Create the new directory in your apache document root or your choices.
* `cd {your directory}` Enter your project directory
* `yo wp-automate` to generate WordPress project structure
* Select appropriate options from generator prompt
* After all options selected `npm install && bower install` will run automatically
* If this failed you can run manually
* After npm and bower successfully installed `gulp wpSetup` will run
* If npm instal && bower install failed then `gulp wpSetup` will not run automatically. You have to run manually. This will generate all project structure.
 