const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "./uploads"))); //use globally
app.use(bodyParser.urlencoded({extended: true, limit:"50mb"}));


// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path:"config/.env",
    })
}

// import routes
const user = require("./controller/user");

app.use("/api/v2/user", user);

const ErrorHandler = require("./middleware/error");
// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;