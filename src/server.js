require("dotenv").config();
const app = require("./app");
const db = require("./config/db");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
