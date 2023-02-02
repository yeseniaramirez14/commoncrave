const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/api", routes);

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@commoncrave.yzy4afb.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(9000, () => {
      console.log("Server running at http://localhost:9000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
