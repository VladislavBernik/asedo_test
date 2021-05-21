let http = require("http");
const MongoClient = require("mongodb").MongoClient;

http.createServer(function (request, response) {}).listen(3000);

const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useUnifiedTopology: true,
});

let bool = { bool: false };

mongoClient.connect(function (err, client) {
  const db = client.db("test");
  const col = db.collection("test");
  col.insertOne(bool, function (err, result) {
    col.findOneAndUpdate(
      { bool: false },
      { $set: { bool: true } },
      {
        returnOriginal: false,
      },
      function (err, result) {
        console.log(result);
        client.close();
      }
    );
  });
});
