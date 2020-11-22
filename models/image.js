const { Schema, model } = require('mongoose');

//schema
const imageSchema = new Schema({
	alt: { type: String, required: true },
	img: { type: String, required: true },
});

//model
const Image = model('Image', imageSchema);

//export
module.exports = Image;
