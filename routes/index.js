var express = require("express"),
    router = express.Router(),
    User = require("../modules/user"),
    passport = require("passport");
    
//=============
// ROOT ROUTE
//=============
router.get("/", function(req, res){
    res.redirect('/campgrounds');
});

//=============
// AUTH ROUTES
//=============
router.get('/register', function(req, res){
    res.render('register');
});

router.post("/register", function(req, res){
    User.register(new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    }), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp "+ user.username)
            res.redirect("/campgrounds");
        })
    })
});

//================
// LOGIN ROUTES
//================
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: '/login'
    }), function(req, res) {
});

//================
// LOGOUT ROUTES
//================
router.get('/logout', function(req, res){
    req.logout();
    req.flash("success", "Logged out successful!");
    res.redirect('/campgrounds');
});

router.get("/profile", function(req, res){
    res.render('profile');
});


module.exports = router;