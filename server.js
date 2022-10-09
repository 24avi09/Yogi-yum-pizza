require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3300;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")

//DataBase connection
mongoose
  .connect(
    "mongodb+srv://abhi03:UQkqPECmlouMcNjb@cluster1.kwsn7az.mongodb.net/Pizza",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

const connection = mongoose.connection;

//Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        // mongoUrl: process.env.MONGO_CONNECTION_URL
        client: connection.getClient()
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hrs
  })
);

app.use(flash());

//Assets
app.use(express.static("public"));
app.use(express.json());

//Global middleware
app.use((req,res,next) => {
  res.locals.session = req.session
  next()
})

//Set templet engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
