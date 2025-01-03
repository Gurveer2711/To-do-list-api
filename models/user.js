const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mongoprac');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true , trim:true
    },
    email: {
        type: String, required: true, unique:true , lowercase: true,trim : true
    },
    password: {
        type: String, required: true, minlength : 7
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


