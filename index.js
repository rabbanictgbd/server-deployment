const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@akrmdb.kpdvynd.mongodb.net/?retryWrites=true&w=majority&appName=AKRMDB`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}
);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    app.get('/tips', async (req, res) => {
      const corsour = userCollection.find();
      const result = await corsour.toArray();
      res.send(result);
    })
    // await client.connect();
    const tipsCollection = client.db('gardeningDB').collection('tips');
    app.post('/tips', async (req, res) => {
      const tip = req.body;
      const result = await tipsCollection.insertOne(tip);
      console.log(result)
      res.send(result);
      console.log(result)
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})




// app.post('/tips', async (req, res) => {
//   try {
//     const tip = req.body;
//     const tipsCollection = client.db("gardeningDB").collection("tips");
//     const result = await tipsCollection.insertOne(tip);
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: "Failed to add tip", details: error.message });
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})