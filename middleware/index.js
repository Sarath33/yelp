var camp = require("../models/campgrounds");
var Comment = require("../models/comments");



var middleware = {}

middleware.checkOwner = function(req,res,next){
	if(req.isAuthenticated())
	{
	camp.findById(req.params.id, function(err,campy){
		if(err)
			{
				req.flash("error","no user match");
				res.redirect("back");
		}else{
			if(req.user._id.equals(campy.author.id))
			{
				req.flash("success","successfully !!! got in");
				next();
			}
			else
				{
					req.flash("error","no user match");
					res.redirect("back");
				}
		}
				
	})}
	else{
		req.flash("error","login to go further");
		res.redirect("back");
	}
}

  middleware.checkComment = function  (req,res,next){
	if(req.isAuthenticated())
	{
	Comment.findById(req.params.comment_id, function(err,campy){
		if(err)
			{
				res.redirect("back");
		}else{
			if(req.user._id.equals(campy.author.id))
			{
				
				next();
			}
			else
				{
					res.redirect("back");
				}
		}
				
	})}
	else{
		res.redirect("back");
	}
}
  
  
   middleware.isLoggedIn = function (req,res,next){
	if(req.isAuthenticated())
		{
			return next();
		}
	   req.flash("error","please login to go further");
	res.redirect('/login');
}

module.exports = middleware;