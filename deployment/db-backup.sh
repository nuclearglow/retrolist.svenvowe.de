# export mysql database from remote

ssh $REMOTE_SERVER "bash -i -c 'cd $REMOTE_DEPLOYMENTS_PATH; mysqldump --defaults-extra-file=$MYSQL_EXTRAS_FILE_PATH -h $MYSQL_HOST -u $MYSQL_USER $MYSQL_DATABASE > $REMOTE_MYSQL_EXPORT_PATH$(date +%F)-$REMOTE_DEPLOYMENT_NAME.prod.sql'"

# sync mysql databases from remote to local
rsync --archive --verbose --human-readable $REMOTE_USERNAME@$REMOTE_SERVER:$REMOTE_MYSQL_EXPORT_PATH $LOCAL_MYSQL_BACKUP_PATH
