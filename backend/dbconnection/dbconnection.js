const mongo = require("mongoose");

const dbconntect = async () => {
  try {
    await mongo.connect(process.env.MONGO_URL);
    console.log("database conntection successfully");
  } catch (error) {
    console.log("database connection fail");
    process.exit(0);
  }
};

module.exports = dbconntect;
