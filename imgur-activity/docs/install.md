
from scratch

## node

    mkdir imgur-activity
    cd imgur-activity
    mkdir node
    // download node binaries tar.gz for appropriate platform
    // unzip to imgur-activity/node
    // generate package.json
    node/bin/npm init

## express 

    node/bin/npm install express
    node/bin/npm install express-generator
    node_modules/express-generator/bin/express imgur-activity
    cd imgur-activity
    ../node/bin/npm install

    // run local
    DEBUG=myapp ./bin/www
    // or
    ../node/bin/npm start

    visit localhost:3000


