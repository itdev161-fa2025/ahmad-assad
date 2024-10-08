const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const payload = {
  user: {
    id: user.id
  }
};

jwt.sign(
  payload,
  config.get('jwtSecret'),
  { expiresIn: 3600 },
  (err, token) => {
    if (err) throw err;
    res.json({ token });
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;