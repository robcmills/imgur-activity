
// start mongod
cd imgur-activity
mongod --dbpath data // <path to data directory>

// mongo shell
mongo
show dbs
use imgur_activity
show collections
db.<collection>.remove({}) // remove all docs in collection