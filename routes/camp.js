var express = require('express');
var	router = express.Router();

var camp = require("../models/campgrounds");
var middleware = require("../middleware/index");





router.get('/camp',function(req,res){
	
		camp.find({},function(err,campy){
			if(err){
				console.log(err);
			}
			else{
				res.render('campgrounds/camp.ejs',{obj: campy,User: req.user});
			}
		})
})



router.post('/camp',function(req,res){
	
	var title = req.body.title;
	var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var author={
		id: req.user._id,
		username: req.user.username
	};
	var ob ={title:title,image:image,price: price,description: description,author:author};
	
	camp.create(ob,function(err,campy){
		if(err){
			console.log(err);
		}
	else{

		res.redirect('/camp');
	}
	})
	
	
})






router.get('/camp/new',middleware.isLoggedIn, function(req,res){
	res.render('campgrounds/adding.ejs');
})

router.get('/camp/:id',function(req,res){
	
	camp.findById(req.params.id).populate("comments").exec(function(err,campy2){
		if(err){
			console.log(err);
		}else{
			
			res.render("campgrounds/desc",{obj: campy2});
		}
	})
})

router.get('/camp/:id/edit',middleware.checkOwner, function(req,res){
	
	
	camp.findById(req.params.id, function(err,campy){
		res.render("campgrounds/edit",{obj:campy});
			})
})

router.put('/camp/:id',middleware.checkOwner,function(req,res){
	camp.findByIdAndUpdate(req.params.id,req.body.campground,function(err,update){
		if(err)
			{
				res.redirect("/camp");
			}
		else{
			res.redirect("/camp/"+req.params.id);
		}
	})
})

router.delete('/camp/:id',middleware.checkOwner,function(req,res){
	camp.findByIdAndRemove(req.params.id,function(err,campy){
		if(err){
			res.redirect('/camp');
		}
		else{
			res.redirect('/camp');
		}
	})
})








module.exports = router;