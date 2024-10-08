const express = require('express');
const { check, validationResult } = require('express-validator');

const User = require('./models/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config = require('config');

const app = express();
app.use(express.json());

app.post(
  '/api/users',
  [
    check('name', 'Please enter your name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send('User successfully registered');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));