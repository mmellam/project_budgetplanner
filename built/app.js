"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const dotenv = require("dotenv").config();
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var envelopes_1 = require("./routes/envelopes");
//const envRouter = require("./routes/envelopes");
//const transfersRouter = require("./routes/transfers");
var app = (0, express_1.default)();
var dotenvConfig = dotenv_1.default.config();
var PORT = process.env.PORT || 3000;
app.use("/api/envelopes", envelopes_1.envRouter);
//app.use("/api/transfers", transfersRouter);
app.get("/", function (req, res) {
    res.status(200).send("<h1>Welcome to Budgetplanner 2.0!<h1>");
});
app.listen(PORT, function () {
    console.log("Server listening on port ".concat(PORT));
});
