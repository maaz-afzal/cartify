const moongose = require("mongoose");
const url = process.env.MONGODB_URL;

moongose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

module.exports = moongose;