const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
   
    // await client.connect();
    const tipsCollection = client.db('gardeningDB').collection('tips');
    const gardenersCollection = client.db('gardeningDB').collection('gardeners');

     app.get('/tips', async (req, res) => {
      const cursor =  tipsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
     app.get('/tips/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await tipsCollection.findOne(query);
      res.send(result);
    })
     app.get('/gardeners', async (req, res) => {
      const cursor = gardenersCollection.find({ status: "active" }).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    })

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






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})