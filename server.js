import express from 'express';
import connectDatabase from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDatabase();

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));