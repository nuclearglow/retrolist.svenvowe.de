#!/usr/bin/env bash
set -euo pipefail

: "${LOCAL_PATH:?}" "${REMOTE_SERVER:?}" "${REMOTE_USERNAME:?}" "${REMOTE_PATH:?}"
: "${REMOTE_DEPLOYMENTS_PATH:?}" "${REMOTE_DEPLOYMENT_NAME:?}"

# non-interactive ssh: no tty, no stdin, detect dead connections instead of hanging forever
SSH_OPTS=(-o ConnectTimeout=15 -o ServerAliveInterval=15 -o ServerAliveCountMax=4)
# node/npm/pm2 live in the fnm default alias; ~/.bashrc is not loaded by non-interactive shells
REMOTE_ENV='export PATH=$HOME/.local/share/fnm/aliases/default/bin:$PATH'

# add package.json to build folder
cp -p package.json $LOCAL_PATH
cp -p package-lock.json $LOCAL_PATH
# add prisma folder to build folder
cp -pR prisma $LOCAL_PATH
# add server setup script to build folder
cp -p deployment/prodServer.ts $LOCAL_PATH
# copy server setup script dependencies to build folder, exlcude sveltekit serverside module
find src/lib/websocket/ -type f ! -name websocket.server.ts -exec cp -t $LOCAL_PATH {} +

# deploy files
rsync --archive --verbose --human-readable --delete --exclude node_modules --filter 'protect .env' \
	-e "ssh ${SSH_OPTS[*]}" "$LOCAL_PATH" "$REMOTE_USERNAME@$REMOTE_SERVER:$REMOTE_PATH"

# install dependencies and migrate database
ssh "${SSH_OPTS[@]}" "$REMOTE_SERVER" "$REMOTE_ENV; set -e; cd $REMOTE_PATH; timeout 600 npm ci --no-progress; timeout 300 npx prisma migrate deploy" </dev/null

# restart deployment: delete + start so the latest env from ecosystem.config.js is picked up
# (pm2 restart preserves the original process env and won't re-read env blocks)
ssh "${SSH_OPTS[@]}" "$REMOTE_SERVER" "$REMOTE_ENV; set -e; cd $REMOTE_DEPLOYMENTS_PATH; pm2 delete $REMOTE_DEPLOYMENT_NAME || true; pm2 start ecosystem.config.js --only $REMOTE_DEPLOYMENT_NAME; pm2 save" </dev/null
