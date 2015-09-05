
from scratch

## node

    // install node
    // generate package.json
    node init
    // install nodemon
    npm install nodemon

## express 

    npm install express
    npm install express-generator
    express-generator imgur-activity
    cd imgur-activity
    npm install

    // run local
    node_modules/nodemon/bin/nodemon.js server.js
    visit localhost:3000

## mongo

    // install mongodb (osx)
    brew install mongodb
    mkdir data
    // start mongo
    mongod --dbpath data // <path to data directory>

    // create imgur-activity db
    // open a new shell
    mongo
    > use imgur_activity // * db names use underscores
    // insert a document to create db
    > db.create.insert({})
    > exit

## mongoose

    npm install mongoose --save
