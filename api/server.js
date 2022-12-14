const app = require("./app");
const connect = require("./src/configs/db");
require("dotenv").config();

app.listen(process.env.PORT || 5000, () => {
  connect();
  console.log("Listening to PORT 5000");
});
