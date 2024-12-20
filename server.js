const express = require('express');
const { check, validationResult } = require('express-validator');
const connectDB = require('./config/db');
const Post = require('./models/Post'); 
const { authMiddleware } = require('./middleware/auth'); 
const auth = require('./middleware/auth');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const returnToken = (user, res) => {
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
};

app.get('/api/auth/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

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
            
            returnToken(user, res);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

app.post(
    '/api/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            returnToken(user, res);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

app.post(
    '/api/posts',
    authMiddleware, 
    [
        check('title', 'Title is required').notEmpty(),
        check('body', 'Body is required').notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            
            const { title, body } = req.body;
            const user = req.user.id; 

            const post = new Post({
                user,
                title,
                body,
            });

            const savedPost = await post.save();

            res.status(201).json(savedPost);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: 'Server error' });
        }
    }
);

app.get(
    '/api/posts',
    authMiddleware, 
    async (req, res) => {
        try {
            const posts = await Post.find().sort({ date: -1 });

            res.status(200).json(posts);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: 'Server error' });
        }
    }
);

app.get(
    '/api/posts/:id',
    authMiddleware, 
    async (req, res) => {
        try {
            const { id } = req.params;

            const post = await Post.findById(id);

            if (!post) {
                return res.status(404).json({ msg: 'Post not found' });
            }

            res.status(200).json(post);
        } catch (error) {
            console.error(error.message);

            if (error.kind === 'ObjectId') {
                return res.status(400).json({ msg: 'Invalid post ID' });
            }

            res.status(500).json({ msg: 'Server error' });
        }
    }
);

app.delete(
    '/api/posts/:id',
    authMiddleware, 
    async (req, res) => {
        try {
            const { id } = req.params;

            const post = await Post.findById(id);

            if (!post) {
                return res.status(404).json({ msg: 'Post not found' });
            }

            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized to delete this post' });
            }

            await post.deleteOne();

            res.status(200).json({ msg: 'Post deleted successfully' });
        } catch (error) {
            console.error(error.message);

            if (error.kind === 'ObjectId') {
                return res.status(400).json({ msg: 'Invalid post ID' });
            }

            res.status(500).json({ msg: 'Server error' });
        }
    }
);

app.put(
    '/api/posts/:id',
    authMiddleware, 
    async (req, res) => {
        try {
            const { id } = req.params;

            
            const { title, body } = req.body;

            const post = await Post.findById(id);

            if (!post) {
                return res.status(404).json({ msg: 'Post not found' });
            }

            
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized to update this post' });
            }

            if (title) post.title = title;
            if (body) post.body = body;

            const updatedPost = await post.save();

            res.status(200).json(updatedPost);
        } catch (error) {
            console.error(error.message);

            if (error.kind === 'ObjectId') {
                return res.status(400).json({ msg: 'Invalid post ID' });
            }

            res.status(500).json({ msg: 'Server error' });
        }
    }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));