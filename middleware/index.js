var Campground = require("../modules/campground");
var Post = require("../modules/post");
var middlewareObj = {};

middlewareObj.checkCampgroundOwner = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                res.redirect("back");
            } else {
                if(campground.creator.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkPostOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Post.findById(req.params.post_id, function(err, foundPost){
            if(err){
                res.redirect("back");
            } else {
                if(foundPost.author.id.equals(req.user.id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("/login");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = middlewareObj;