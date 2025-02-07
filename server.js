require('dotenv').config();
const express = require('express');
const {connectDB} = require('./db');
const eventRoutes = require('./routes/event.js');
const cors = require('cors');




const app = express();
app.use(cors());

connectDB()

app.use(express.json());

app.use('/api/event', eventRoutes)

app.get('/', (req, res) => {
	res.send('API is running.');
})


if (require.main === module) {
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;