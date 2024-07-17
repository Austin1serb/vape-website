const express = require('express');
const serverless = require('serverless-http');
const categoryRoutes = require('../routes/categories.routes');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const username = process.env.ATLAS_USERNAME;
const password = process.env.ATLAS_PASSWORD;
const cluster = process.env.ATLAS_CLUSTER;
const dbName = process.env.ATLAS_DB;
const url = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to MongoDB: ${dbName}`))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/category', categoryRoutes);

module.exports = app;
module.exports.handler = serverless(app);