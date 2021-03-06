const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let User;

if (!User) {
  let userSchema = new Schema(
    {
      email: { type: String, required: true, lowercase: true, unique: true },
      password: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  userSchema.pre('save', function (next) {
    const user = this;
    const SALT_FACTOR = 5;

    // If password is not modified, we return next()
    if (!user.isModified('password')) {
      return next();
    }

    // The password has been modified, so let's encrypt it
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;

        next();
      });
    });
  });

  User = mongoose.model('User', userSchema);
}

module.exports = User;
