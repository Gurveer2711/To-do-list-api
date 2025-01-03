const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mongoprac');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);


