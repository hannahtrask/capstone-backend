const Image = require('../models/image');
const { Router } = require('express');
const router = Router();
const imageData = require('../db/seedImage.json');

//seed route
router.get('/images/seed', async (req, res) => {
	try {
		await Image.deleteMany({});
		const image = await Image.insertMany(imageData);
		res.json({ status: 200, data: image });
	} catch (err) {
		res.status(400).json({ err });
	}
});

//index route
router.get('/images', async (req, res) => {
	res.json(await Image.find({}));
});

//create route
router.post('/images', async (req, res) => {
	res.json(await Image.create(req.body));
});


//delete one by id route
router.delete('/images/:id', async (req, res) => {
	res.json(await Image.findByIdAndRemove(req.params.id));
});

//export router
module.exports = router;
