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

app.get('/', async (req, res) => {
	const response = await fetch('http://api.powderlin.es/closest_stations?lat=43.4695&lng=-110.7892&data=true&days=5&count=5');
	const data = await response.json();
	res.json(await data);
});

//

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
