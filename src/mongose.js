const mongoose = require("mongoose");
const settings = require("./config");

module.exports = () => {
  mongoose.connect(
    `mongodb://${settings.db.dbServer}/${settings.db.dbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  mongoose.Promise = Promise;

  mongoose.connection.on("connected", () => {
    console.log(
      `Mongo connected at mongodb://${settings.db.dbServer}/${settings.db.dbName}`
    );
  });

  mongoose.connection.on("error", (error) => {
    console.log("Mongoose error" + error);
  });
};
