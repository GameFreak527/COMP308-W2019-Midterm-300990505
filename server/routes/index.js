/*
Index page routes
Name - Shiv Rana
Student Id - 300990505
Web App - Favorite Book
*/

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the game model
let book = require("../models/books");

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    books: ""
  });
});

//GET the loginPage
router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
    messages: "Nothing"
  });
});

//POST process the login page
router.post("/login", (req, res, next) => {});

//GET displays the registration page
router.get("/register", (req, res, next) => {
  res.render("auth/register", {
    title: "Registration",
    messages: "Nothing"
  });
});

//POST process the registration page
router.post("/register", (req, res, next) => {});

module.exports = router;
