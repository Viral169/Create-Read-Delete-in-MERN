require("dotenv").config();
const express = require("express");
const dbconntected = require("./dbconnection/dbconnection");
const userrouters = require("./router/userrout");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/api/v1", userrouters);

app.get("/", (req, res) => {
  res.send("hello mern");
});

const port = 7000;
const host = "127.0.0.1";

dbconntected().then(() => {
  app.listen(port, host, () => {
    console.log(`server is runnig on port http://${host}:${port}`);
  });
});


module.exports = app; // <-- important for Vercel
