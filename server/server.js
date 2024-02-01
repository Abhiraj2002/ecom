const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT || 5000;
const itemsCollection = require('./itemsCollection');
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
// connect to the mongodb database
connectDB();
app.use('/account', authRoutes);
app.use('/api/items', require('./routes/items'));
app.use('/api/payment', require('./routes/payment'));

app.listen(PORT, console.log('Server is running on port ', PORT));
