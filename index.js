const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l532k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());


client.connect(err => {
  const bookCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION1}`);
  const orderCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION2}`);

  app.post('/addBook', (req, res) => {
    bookCollection.insertOne(req.body)
      .then(result => {
        console.log(result);
        res.send(result.insertedCount > 0);
      })
  })

  app.get('/getAllBooks', (req, res) => {
    bookCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.get('/getBook', (req, res) => {
    bookCollection.find({ _id: ObjectID(req.query.id) })
      .toArray((err, documents) => {
        res.send(documents[0]);
      })
  })

  app.post('/addOrder', (req, res) => {
    orderCollection.insertOne(req.body)
      .then(result => {
        res.send(result.insertedCount > 0);
      })
  })

  app.get('/getOrder', (req, res) => {
    orderCollection.find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.delete('/delete', (req, res) => {
    bookCollection.deleteOne({ _id: ObjectID(req.query.id) })
      .then(result => {
        res.send(result.deletedCount > 0);
      })
  })

});


app.get('/', (req, res) => {
  res.send('Hello!!! Greetings form the server.')
})

app.listen(port)