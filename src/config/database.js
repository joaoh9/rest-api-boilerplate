const mongoose = require("mongoose");
const settings = require("./settings");

module.exports = () => {
  mongoose.connect(
    settings.mongo.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  // mongoose promise is deprecated
  mongoose.Promise = Promise;

  // escolhe se mostra log de ações pelo mongoose ou não
  mongoose.set('debug', settings.mongo.isMongoDebug)

  mongoose.connection.on("connected", () => {
    console.log(
      `Mongo connected at mongodb://${settings.mongo.dbServer}/${settings.mongo.dbName}`
    );
  });

  mongoose.connection.on("error", (error) => {
    console.log("Mongoose error" + error);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose! Disconnected by the application');
      process.exit(0);
    });
  });
};
