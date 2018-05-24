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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
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
    res.redirect('/campgrounds');
});

router.get("/profile", function(req, res){
    res.render('profile');
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;