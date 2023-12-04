const { MongoClient } = require("mongodb");

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(process.env.MONGODB_URI)
      .then((client) => {
        dbConnection = client.db("Store");
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: (collection) => dbConnection.collection(collection),
};
