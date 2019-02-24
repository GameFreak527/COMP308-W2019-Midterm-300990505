let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      default: "",
      trim: true,
      required: "Username is required"
    },
    email: {
      type: email,
      default: "",
      trim: true,
      required: "Email is required"
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: "Display Name is required"
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "users"
  }
);

//Configure the options

let options = {
  missingPasswordError: "Wrong / Missing password"
};

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", userSchema);
