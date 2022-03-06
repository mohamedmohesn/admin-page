const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
// const admin = require('./routes/admin');
const pharmcy = require('./routes/pharmcyRoutes');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const multer = require('multer');
require('dotenv').config()
const app = express();

// middleware
// app.use(multer);

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
// database connection
const port = app.listen(process.env.PORT || 5000)
const dbURI = 'mongodb+srv://mohamedmohesn:M123456@cluster0.mduad.mongodb.net/client?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) =>console.log("work on 5000"))
  .catch((err) => console.log(err));
  // console.log("Database_URL", process.env.DATABASE_URL);
// routesclient
app.get('/', (req, res) => res.send('firstpage'));
app.use(userRoutes);
app.use(doctorRoutes);
app.use(pharmcy);
app.use('/app/uploads',express.static('uploads'));
// app.use(admin);
