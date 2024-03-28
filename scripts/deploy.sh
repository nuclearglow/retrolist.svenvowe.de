# add package.json to build folder
cp -p package.json $LOCAL_PATH

# deploy files
# TODO: activate after setting everything up
rsync --archive --verbose --human-readable --delete --dry-run $LOCAL_PATH $REMOTE_USERNAME@$REMOTE_SERVER:$REMOTE_PATH

# restart app
ssh $REMOTE_SERVER "bash -i -c 'cd $REMOTE_DEPLOYMENTS_PATH; pm2 restart $REMOTE_DEPLOYMENT_NAME'"
