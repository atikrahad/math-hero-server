const express = require("express");
const app = express();
require("dotenv").config();
const port = 5000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.DB_user}:${process.env.DB_Pass}@cluster0.1lk0tsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    
    await client.connect();
    

    const userCollection = client.db("MathHero").collection("users")

    app.get("/user", async(req, res)=>{
        const info = req.query.email
        const result = await userCollection.findOne({email: info})
        res.send(result)
    })

    app.post("/user", async(req, res)=>{
        const info = req.body
        const result =await userCollection.insertOne(info)
        res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log("server is running with", port);
});
