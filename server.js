const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('morgan'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/', (req, res) => {
    // read query parameters, not sure where these come from
    // consider token
	const lat = req.query['lat'];
    const lng = req.query['lng'];
	const url = `http://api.powderlin.es/closest_stations?lat=${lat}&lng=${lng}&data=true&days=5&count=5`;
	request(url).pipe(res);
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
