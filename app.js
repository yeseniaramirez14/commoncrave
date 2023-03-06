const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "client", "build")));

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@commoncrave.yzy4afb.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
