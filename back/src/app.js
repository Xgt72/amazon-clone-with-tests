const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// let's create express app

const app = express();

// use some application-level middlewares

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders:
      "Content-Type, Authorization, X-Requested-With, Accept, xsrf-token",
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public/front")));

// load router

const router = require("./router");

app.use(router);

// ready to export
module.exports = app;
