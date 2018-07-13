var Campground = require("../modules/campground");
var Post = require("../modules/post");
var middlewareObj = {};

middlewareObj.checkCampgroundOwner = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                req.flash("error", "Campground not found!")
                res.redirect("back");
            } else {
                if(campground.creator.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Must be logged in first!");
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
        req.flash("error", "Must be logged in first!");
        res.redirect("/login");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please log in first!");
    res.redirect('/login');
};

module.exports = middlewareObj;