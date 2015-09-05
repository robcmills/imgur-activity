
    // start mongod
    mongod --dbpath imgur-activity/data // <path to data directory>

    // mongo shell
    mongo
    show dbs
    use imgur_activity
    show collections
    db.<collection>.remove({}) // remove all docs in collection