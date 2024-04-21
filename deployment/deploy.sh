# add package.json to build folder
cp -p package.json $LOCAL_PATH
cp -p package-lock.json $LOCAL_PATH
# add prisma folder to build folder
cp -pR prisma $LOCAL_PATH
# add server setup script to build folder
cp -p deployment/prodServer.ts $LOCAL_PATH
# copy server setup script dependencies to build folder, exlcude sveltekit serverside module
find src/lib/websocket/ ! -name websocket.server.ts -exec cp -t $LOCAL_PATH {} +

# deploy files
rsync --archive --verbose --human-readable --delete --exclude node_modules --filter 'protect .env' $LOCAL_PATH $REMOTE_USERNAME@$REMOTE_SERVER:$REMOTE_PATH

# install dependencies and migrate database
ssh $REMOTE_SERVER "bash -i -c 'cd $REMOTE_PATH; npm ci --no-progress; npx prisma migrate deploy'"
# restart deployment
ssh $REMOTE_SERVER "bash -i -c 'cd $REMOTE_DEPLOYMENTS_PATH; pm2 restart $REMOTE_DEPLOYMENT_NAME'"
