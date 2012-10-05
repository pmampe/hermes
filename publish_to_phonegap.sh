#!/bin/bash

APP_ID="219084"
USER="utveckling@it.su.se"
PASS=${PG_PASS}
TOKEN_URL="https://build.phonegap.com/token"
API_URL="https://build.phonegap.com/api/v1/apps"
TAR_FILE="su.tar.gz"

rm assets/www/cordova*.js

sed -i 's,cordova-2.0.0.js,phonegap.js,' assets/www/index.html

rm ${TAR_FILE}
tar -C assets/ -czvf ${TAR_FILE} www/

TOKEN=`curl -su "${USER}:${PASS}" -X POST -d "" https://build.phonegap.com/token | sed -E 's/.*:"([^"]+)".*/\1/'`

curl -X PUT -F file=@${TAR_FILE} ${API_URL}/${APP_ID}?auth_token=$TOKEN

