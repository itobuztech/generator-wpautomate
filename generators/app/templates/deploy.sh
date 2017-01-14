. ./sh/config.sh;

echo '-----------------------------------------------';
echo "$WPROJECTNAME Deploy";
echo '-----------------------------------------------';

echo "Rquirement before deployment";
echo "SSH connection with your server";
echo  "private key for ssh connection ";
echo  "Wp cli, git installed in your server";
echo  "And ssh connection between  host and repository host";
echo "=================================================";


echo -n "Do you want to deploy (y/n)?"
read answer
if echo "$answer" | grep -iq "^y" ;then
    echo 'Connecting with deploy host with ssh.'
else
  echo 'Aborted.'
  exit 1;
fi


status=$(ssh -o BatchMode=yes -o ConnectTimeout=1 $WHOSTDEPLOYUSER@$WHOSTDEPLOYNAME echo ok 2>&1)

if [[ $status == ok ]] ; then
  echo 'connected';
elif [[ $status == "Permission denied"* ]] ; then
  echo 'no_auth';
  echo 'run ssh-add ssh-key path'
  exit 1;
else
  echo 'Unknown error';
  exit 1;
fi

DEPLOYFULLPATH=$WHOSTDEPLOYPATH$WPROJECTNAME;

if (ssh  $WHOSTDEPLOYUSER@$WHOSTDEPLOYNAME "test -d $DEPLOYFULLPATH"); then
  echo 'Project exist';
  ssh  $WHOSTDEPLOYUSER@$WHOSTDEPLOYNAME "cd $DEPLOYFULLPATH && git status";
  ssh  $WHOSTDEPLOYUSER@$WHOSTDEPLOYNAME "cd $DEPLOYFULLPATH && git pull origin master";
else
  echo "Deploying first time";
  echo "Cloneing from your repository";
  ssh  $WHOSTDEPLOYUSER@$WHOSTDEPLOYNAME "git clone $WREPO $DEPLOYFULLPATH";
  ssh  $WHOSTDEPLOYUSER@$WHOSTDEPLOYNAME "cd $DEPLOYFULLPATH && sh/setup-remote.sh";
fi;
