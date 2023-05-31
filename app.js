const express = require("express");
const connectDatabase = require("./db/database");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true}));


// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path:"config/.env",
    })
}

// import routes
const user = require("./controller/user");

app.use("/app/v2/user", user);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;