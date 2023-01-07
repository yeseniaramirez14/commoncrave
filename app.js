const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config()

const app = express();

app.use(bodyParser.json());

// app.get('/', (req, res, next) => {
//     res.send('Hello World!');
// })

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    // object that has all the resolver functions in it and the resolver functions need to match our schema endpoints by name
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@commoncrave.yzy4afb.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@commoncrave.yzy4afb.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(9000, () => {
      console.log("GraphQL server running at http://localhost:9000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
