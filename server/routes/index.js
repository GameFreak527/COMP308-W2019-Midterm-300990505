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
let passport = require("passport");

//User Model
let userModel = require("../models/user");
let User = userModel.User;

// define the game model
let book = require("../models/books");

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    books: "",
    displayName: req.user ? req.user.displayName : ""
  });
});

//GET the loginPage
router.get("/login", (req, res, next) => {
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : ""
    });
  } else {
    res.redirect("/");
  }
});

//POST process the login page
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server error?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.logIn(user, err => {
      // server error?
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

//GET displays the registration page
router.get("/register", (req, res, next) => {
  res.render("auth/register", {
    title: "Registration",
    messages: req.flash("registerMessage"),
    displayName: req.user ? req.user.displayName : ""
  });
});

//GET Logout
router.get("/logout", (req, res, next) => {
  req.logOut();
  res.redirect("/");
});

//POST process the registration page
router.post("/register", (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });
  //Register the user
  User.register(newUser, req.body.password, err => {
    if (err) {
      console.log("Error: Inserting New User");
      req.flash("registerMessage", "Registration Error: Inserting New User!");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : ""
      });
    } else {
      // if no error exists, then registration is successful

      // redirect the user
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  });
});

module.exports = router;
