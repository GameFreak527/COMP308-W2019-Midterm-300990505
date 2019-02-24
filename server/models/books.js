/*
Book Schema
Name - Shiv Rana
Student Id - 300990505
Web App - Favorite Book
*/

let mongoose = require("mongoose");

// create a model class
let gamesSchema = mongoose.Schema(
  {
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
  },
  {
    collection: "books"
  }
);

module.exports = mongoose.model("books", gamesSchema);
