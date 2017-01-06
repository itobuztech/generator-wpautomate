. config.sh;

echo -n "You need to add ssh key";
echo -n "RUN ssh-add ssh-key file";
echo -n "Do you want to deploy (y/n)?"
read answer
if echo "$answer" | grep -iq "^y" ;then
    echo 'Yes'
else
    echo 'No'
fi

ssh -q WHOSTDEPLOYUSER@WHOSTDEPLOY exit
if($?=0);then
  echo 'Host connected';
else
  echo 'not connected.'
