echo "Not implemented yet..."
exit 1

# import the latest database backup file to the remote database
# TODO: automate
# 1. find and upload the latest database backup file from the local to remote server flder -> $LATEST_DB_BACKUP_FILE
# 2. use mysql cli to import the database backup file such as here:

# ssh $REMOTE_SERVER "bash -i -c 'cd $REMOTE_DEPLOYMENTS_PATH; mysql --defaults-extra-file=$MYSQL_EXTRAS_FILE_PATH -h $MYSQL_HOST -u $MYSQL_USER $MYSQL_DATABASE < $REMOTE_MYSQL_EXPORT_PATH$LATEST_DB_BACKUP_FILE'"

# TODO: test, dry-run and use once
