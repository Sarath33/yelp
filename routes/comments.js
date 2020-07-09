var express = require('express'),
	router = express.Router();
var camp = require("../models/campgrounds");
var Comment = require("../models/comments");
var middleware = require("../middleware/index");




router.get('/camp/:id/comments/new',middleware.isLoggedIn,function(req,res){
	camp.findById(req.params.id,function(err,campy){
		
			res.render("comments/new",{obj:campy});
		
	})
	
})

router.post('/camp/:id/comment',middleware.isLoggedIn,function(req,res){
	camp.findById(req.params.id,function(err,campy){
		if(err)
			{
				console.log(err);
				res.redirect('/camp');
			}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}
				else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campy.comments.push(comment);
					campy.save();
					
					req.flash("success","successfully added comment");
					res.redirect('/camp/'+campy._id);
				}
			})
		}
	});
})


router.get("/camp/:id/comment/:comment_id/edit",middleware.checkComment, function(req,res){
	Comment.findById(req.params.comment_id,function(err,campy){
		if(err){
			res.redirect('back');
		}
		else{
			res.render("comments/edit",{obj_id: req.params.id , comment: campy});
		}
		
	})
});

router.put("/camp/:id/comment/:comment_id",middleware.checkComment,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,campy){
		if(err)
			{
				res.redirect('/camp');
			}
		else{
			req.flash("success","successfully edited");
			res.redirect('/camp/'+req.params.id);
		}
	})
})
	
router.delete('/camp/:id/comment/:comment_id', middleware.checkComment,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect('back');
		}
		else{
				req.flash("success","deleted successfully");
				res.redirect('/camp/'+req.params.id);
		}
	})
	
})
		
	



	
	
	
module.exports = router;
	
