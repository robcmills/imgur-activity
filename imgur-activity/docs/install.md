
from scratch

## node

    // install node
    // generate package.json
    node init
    // install nodemon
    npm install -g nodemon

## express 

    npm install express
    npm install express-generator
    node_modules/express-generator/bin/express-generator imgur-activity
    cd imgur-activity
    npm install

    // run local
    nodemon server.js
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
