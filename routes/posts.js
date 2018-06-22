var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../modules/campground"),
    Post = require("../modules/post"),
    Middleware = require("../middleware");
    
// NEW ROUTE [New Post]
router.get("/new", Middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
            res.render("./post/new", {campground: foundCampground});
       }
    });
});

//CREATE ROUTE [Create Post]
router.post("/", Middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           Post.create(req.body.post, function(err, post){
               if(err) {
                   console.log(err);
               } else {
                   post.author.id = req.user._id;
                   post.author.username = req.user.username;
                   post.save();
                   campground.posts.push(post);
                   campground.save();
                   res.redirect("/campgrounds/"+campground._id);
               }
           });
       }
   });
});

//EDIT ROUTE
router.get("/:post_id/edit", Middleware.checkPostOwnership, function(req, res){
    Post.findById(req.params.post_id, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.render("post/edit", {campground_id: req.params.id, post: post})
        }
    })
});

//UPDATE ROUTE
router.put("/:post_id", Middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndUpdate(req.params.post_id, req.body.post, function(err, updatedPost){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/:post_id", Middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndRemove(req.params.post_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        };
    });
});

module.exports = router;