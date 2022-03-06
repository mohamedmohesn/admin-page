const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const maindoctorRoutes = require('./routes/maindoctorRoutes');
const pharmcy = require('./routes/pharmcyRoutes');
const specialty = require('./routes/specialtyRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/admincheck');
const Route = require('./routes/adminRoutes');

const bodyParser = require("body-parser");
const multer = require('multer');
require('dotenv').config()
const app = express();
// const server = require('http').createServer(app);

app.set('view engine', 'ejs');
// middleware
// app.use(multer);

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// module.exports = server;
 
// database connection
const port = app.listen(process.env.PORT || 5000)
const dbURI = 'mongodb+srv://mohamedmohesn:M123456@cluster0.mduad.mongodb.net/client?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) =>console.log("work on 5000"))
  .catch((err) => console.log(err));
  // console.log("Database_URL", process.env.DATABASE_URL);

// routesclient
app.get('*', checkUser);
app.get('/', (req, res) =>  res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/addadmin', (req, res) => res.render('add'));



app.use(maindoctorRoutes);
app.use(userRoutes);
app.use(doctorRoutes);
app.use(pharmcy);
app.use(specialty);
app.use('/app/uploads',express.static('uploads'));
app.use(Route);
// app.use(messageRouter)

// app.use(admin);
