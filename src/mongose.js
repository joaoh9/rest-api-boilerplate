const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb://localhost/tech-vogel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.Promise = Promise;

  mongoose.connection.on("connected", () => {
    console.log("Mongo connected at mongodb://localhost/tech-vogel");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Mongoose error" + error);
  });
};
