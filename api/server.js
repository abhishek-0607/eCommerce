const app = require("./app");

const connect = require("./src/configs/db");

app.listen(8080, () => {
  connect();
  console.log("Listening to PORT 8080");
});
