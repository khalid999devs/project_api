const config = require("./config");
const app = require("./app");
const { port } = require("./config");
const pool = require("./pool");
const createTable = require("./utils/createTable");

async function main() {
  try {
    pool.connect((error) => {
      if (error) {
        console.log(`error occurred while connecting ${error}`);
      } else {
        console.log("connection created with Mysql successfully");
        // createTable();
      }
    });

    app.listen(port, () => {
      console.log(`app listening on port ${port} | http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to connect", error);
  }
}

main();
