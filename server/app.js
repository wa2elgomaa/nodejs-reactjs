const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require ("mongoose");

// configuration
//Configure mongoose"s promise to global promise
mongoose.promise = global.Promise;
// Global database config
var config = require("./config/database");

// routers 
var mainRouter = require("./routes/main");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");

// init app
var app = express();

// using cors requests handling 
app.use(cors());
// using body parser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// serve public files 
app.use(express.static(path.join(__dirname, 'public')));
// using express session 
app.use(session({ 
  secret: 'iotblue', 
  resave: false, 
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));


//open connection to database using config file
mongoose.connect(config.database);
mongoose.set('debug', false);
var db = mongoose.connection;
db.once("open", function(){
  console.log("Connected to database");
});

// passport
require('./models/users');
require('./config/passport');
// routes 
app.use(cors({origin: "*"}));
app.use("/api", mainRouter);
app.use("/api", usersRouter);
app.use("/api",adminRouter);


module.exports = app;
