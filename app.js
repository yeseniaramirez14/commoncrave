const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require('./routes/routes')
const craving_router = require('./routes/cravings')
dotenv.config()

const app = express();

app.use(bodyParser.json());
app.use('/api', routes)
app.use('/apii', craving_router)


const Craving = require('./collections/craving');

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@commoncrave.yzy4afb.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(9000, () => {
      console.log("Server running at http://localhost:9000");
    });

    // console.log("Hello")
    // Craving.insertMany([
    //     {name: "Mexican"},
    //     {name: "Italian"},
    //     {name: "Japanese"},
    //     {name: "Chinese"}
    // ]).then(function() {
    //     console.log("Cravings inserted")
    // }).catch(function(error) {
    //     throw error
    // });

  })
  .catch((err) => {
    console.log(err);
  });
