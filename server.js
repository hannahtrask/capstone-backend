const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const fetch = require('node-fetch');

app.use(cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

//mongo connection
const mongoose = require('./db/connection');

//other imports
const morgan = require('morgan');

//middleware
app.use(express.json());
app.use(morgan('tiny')); //logging

//controllers
const imageController = require('./controllers/image');
app.use('/avysavvy', imageController);

app.get('/', async (req, res) => {
	const response = await fetch(
		'http://api.powderlin.es/closest_stations?lat=43.4695&lng=-110.7892&data=true&days=5&count=5'
	);
	const data = await response.json();
	res.json(await data);
});

// this route will be for requesting lat and long data
app.get('/request/:lat/:long', async (req, res) => {
	const { lat, long } = req.params;
	const response = await fetch(
		`http://api.powderlin.es/closest_stations?lat=${lat}&lng=${long}&data=true&days=5&count=5`
	);
	const data = await response.json();
	res.json(await data);
});

app.get('/request/:triplet', async (req, res) => {
	const { triplet } = req.params;
	const response = await fetch(
		`http://api.powderlin.es/station/${triplet}?days=5`
	);
	const data = await response.json();
	res.json(await data);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
