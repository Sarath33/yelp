var i = require('express');
var open = i();
var request = require('request');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride =require('method-override');
var camp = require('./models/campgrounds');
var Comment = require('./models/comments');
var User = require('./models/user');
var seedDB = require('./seeds');

//routes
var indexRoutes = require('./routes/index'),
		campRoutes = require('./routes/camp'),
	commentRoutes = require('./routes/comments');
	



mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});

open.use(bodyparser.urlencoded({extended: true}));

var obj;
open.set("view engine","ejs");

open.use(i.static("extstyle"));

open.use(i.static(__dirname + "/public"));

open.use(methodOverride("_method"));
open.use(flash());



//seedDB();

open.use(require("express-session")({
	secret:"try agin babeeee",
	resave: false,
	saveUninitialized: false
}));

open.use(passport.initialize());
open.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

open.use(function(req,res,next){
	res.locals.User = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

open.use(indexRoutes);
open.use(campRoutes);
open.use(commentRoutes);



open.listen(3000,function(){
	console.log("connected");
})