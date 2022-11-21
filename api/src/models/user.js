const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  //const hash = bcrypt.hashSync(this.password,10);
  bcrypt.hash(this.password, 10, (res, hash) => {
    this.password = hash;
    return next();
  });
});

const User = model("user", userSchema);

module.exports = User;
