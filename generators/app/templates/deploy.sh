. config.sh;


echo -n "Do you want to deploy (y/n)?"
read answer
if echo "$answer" | grep -iq "^y" ;then
    echo 'Connecting with deploy host with ssh.'
else
    echo 'Aborted.'
fi

sshconnection=$(ssh -o BatchMode=yes -o ConnectTimeout=5 $WHOSTDEPLOYUSER@$WHOSTDEPLOYNAME echo ok 2>&1)

if [[ $sshconnection == ok ]] ; then
  echo 'connected';
elif [[ $sshconnection == "Permission denied"* ]] ; then
  echo 'no_auth';
  echo 'run ssh-add ssh-key path'
else
  echo 'Unknown error';
fi
