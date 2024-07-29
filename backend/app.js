const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wfxuuyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let jobsCollections;

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Create db
    const db = client.db("jobPortal");
    jobsCollections = db.collection("demojobs");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process with failure code
  }
}

run().catch(console.dir);

// Post a job
app.post("/post-job", async (req, res) => {
  try {
    const body = req.body;
    body.createdAt = new Date();
    console.log("Received data:", body); // Log the received data

    const result = await jobsCollections.insertOne(body);
    console.log("Insertion result:", result); // Log the insertion result

    if (result.insertedId) {
      return res.status(200).send(result);
    } else {
      console.error("Insertion failed:", result); // Log failure details
      return res.status(404).send({
        message: "Cannot insert! Try again later",
        status: false,
      });
    }
  } catch (error) {
    console.error("Error inserting data:", error); // Log any errors
    return res.status(500).send({
      message: "Internal Server Error",
      status: false,
    });
  }
});

// Get all jobs
app.get("/all-jobs", async (req, res) => {
  try {
    const jobs = await jobsCollections.find().toArray();
    res.send(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error); // Log any errors
    res.status(500).send({
      message: "Internal Server Error",
      status: false,
    });
  }
});

// Get jobs by email
app.get("/myJobs/:email", async (req, res) => {
  try {
    const jobs = await jobsCollections
      .find({ postedBy: req.params.email })
      .toArray();
    res.send(jobs);
  } catch (error) {
    console.error("Error fetching jobs by email:", error); // Log any errors
    res.status(500).send({
      message: "Internal Server Error",
      status: false,
    });
  }
});

// Delete a job
app.delete("/job/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await jobsCollections.deleteOne(filter);
    res.send(result);
  } catch (error) {
    console.error("Error deleting job:", error); // Log any errors
    res.status(500).send({
      message: "Internal Server Error",
      status: false,
    });
  }
});

// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`);
});
