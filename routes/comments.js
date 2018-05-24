var express = require("express"),
    router = express.Router(),
    Campground = require("../modules/campground"),
    Post = require("../modules/post");
    
// NEW ROUTE [New Post]
router.get("/campgrounds/:id/posts/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
            res.render("./posts/new", {campground: campground});
       }
    });
});

//CREATE ROUTE [Create Post]
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           Post.create(req.body.comment, function(err, comment){
               if(err) {
                   console.log(err);
               } else {
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   campground.posts.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/"+campground._id);
               }
           });
       }
   });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;