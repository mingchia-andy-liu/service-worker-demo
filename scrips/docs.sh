#!/bin/bash
# remember to give this script permission chmod +x

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

if [ -f $ROOT_DIR/docs/main.js ]; then
    rm $ROOT_DIR/docs/main.js
fi

if [ -f $ROOT_DIR/docs/styles.css ]; then
    rm $ROOT_DIR/docs/styles.css
fi

NODE_ENV=production $ROOT_DIR/node_modules/webpack/bin/webpack.js --config $ROOT_DIR/config/webpack.config.js
cp $ROOT_DIR/src/public/main.js $ROOT_DIR/docs/main.js
$ROOT_DIR/node_modules/node-sass/bin/node-sass $ROOT_DIR/src/app/styles/styles.scss $ROOT_DIR/docs/styles.css