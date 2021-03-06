var express = require("express"),
    router = express.Router(),
    Campground = require("../modules/campground"),
    Middleware = require("../middleware");
// INDEX ROUTE
router.get("/", function(req, res){
    // req.user Contains the information of the currently logged in user
    Campground.find({}, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("./campgrounds/index", {data: campground, currentUser: req.user});
        }
    });
});

// NEW ROUTE [New Campground]
router.get("/new", Middleware.isLoggedIn, function(req, res){
    res.render("./campgrounds/new.ejs");
});

// CREATE ROUTE [Create Campground]
router.post("/", Middleware.isLoggedIn, function(req, res){
    var newName = req.body.name;
    var newImg = req.body.image;
    var newDesc = req.body.description;
    var newCost = req.body.costPerNight;
    var newCampground = {name: newName, image: newImg, description: newDesc, costPerNight: newCost};
    Campground.create(newCampground, function(err, newCampground){
        if(err){
            console.log(err);
        } else {
            newCampground.creator.id = req.user._id;
            newCampground.creator.username = req.user.username;
            newCampground.save();
            console.log(newCampground.name + " saved successful");
            res.redirect("/campgrounds");
        }
    });
});

// SHOW ROUTE
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("posts").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("./campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", Middleware.checkCampgroundOwner, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("./campgrounds/edit", {campground: campground});
        }
    });
});

// UPDATE ROUTE
router.put("/:id", Middleware.checkCampgroundOwner, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/:id", Middleware.checkCampgroundOwner, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;