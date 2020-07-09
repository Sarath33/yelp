var express = require('express'),
	router = express.Router();
var passport = require("passport");
var User = require("../models/user");



router.get('/',function(req,res){
	res.render('home.ejs');
})





router.get('/register',function(req,res){
	res.render('register');
})

router.post('/register',function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err)
			{
				req.flash("error",err.message);
				return res.render('register');
			}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","registered successfully, we welcome "+user.username+" to yelpcamp");
			res.redirect("/camp");
		})
	});
})



router.get('/login',function(req,res){
	res.render("login",{message: req.flash("error")});
})



router.post('/login',passport.authenticate("local",
		 {successRedirect:"/camp",
		  failureRedirect:"/login"
		 
		 }),
		  function(req,res){
	res.send("login done");
})


router.get('/logout',function(req,res){
	req.logout();
	req.flash("success","logged out successfully");
	res.redirect('/camp');
})

module.exports = router;
