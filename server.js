const express = require("express"),
    cors = require("cors"),
    helmet = require("helmet"),
    morgan = require("morgan"),
    path = require("path");

let window = null;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static( path.join(__dirname, "./public") ));

const PORT = 8517;
app.listen(PORT, () => {
    console.log("App running.");
    window = require("./services/window-manager");
})