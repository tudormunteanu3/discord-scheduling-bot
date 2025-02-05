require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const eventRoutes = require('./routes/event.js');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/event', eventRoutes)

app.get('/', (req, res) => {
	res.send('API is running.');
})

const PORT = process.env.Port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));