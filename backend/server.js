const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express();

const { db } = require('./src/config/')
const hostname = process.env.HOSTNAME;
const port = process.env.PORT

app.use(cors())
app.use(require("./src/routes"))

mongoose.connect(db.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));


app.get("/", (req, res) => {
  res.json({ message: "SnakeJS 2.0" });
});

app.listen(port,hostname, () => {
  console.log(`http://ximo.com:${port}`);
});
