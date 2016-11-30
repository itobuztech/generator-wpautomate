<?php
  /**
   * GIT DEPLOYMENT SCRIPT
   *
   * Used for automatically deploying websites via github or bitbucket, more deets here:
   *
   *    https://gist.github.com/808c74fc4178b4c497a14756ca176498
   */

  // The commands
  $commands = array(
    'echo $PWD',
    'whoami',
    'git reset --hard',
    'git status',
    'git pull origin master',
    'wp db import db/db.txt'
  );

  // Run the commands for output
  $output = '';
  foreach($commands AS $command){
    // Run it
    $tmp = shell_exec($command);
    // Output
    $output .= "<span style=\"color: #6BE234;\">\$</span> <span style=\"color: #729FCF;\">{$command}\n</span>";
    $output .= htmlentities(trim($tmp)) . "\n";
  }

  // Make it pretty for manual user access (and why not?)
?>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title>GIT DEPLOYMENT SCRIPT</title>
</head>
<body style="background-color: #000000; color: #FFFFFF; font-weight: bold; padding: 0 10px;">
<pre>
<h1>Git deployment script.</h1>
<h4><a href="https://gist.github.com/808c74fc4178b4c497a14756ca176498">Setup instruction.</a></h4>

<?php echo $output; ?>
</pre>
</body>
</html>
