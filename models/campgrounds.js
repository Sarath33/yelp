var mongoose = require('mongoose');

var photo = new mongoose.Schema({
	title: String,
	price: String,
	image: String,
	description: String,
	author:{
		username: String,
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		}
		
	},
	comments:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}
	]
});
		
var camp = mongoose.model("yelp_camps",photo);

module.exports = camp;
