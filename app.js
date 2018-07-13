var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    Campground = require("./modules/campground"),
    Post = require("./modules/post"),
    User = require("./modules/user"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    seedDB = require("./seeds");
    
var campgroundRoutes = require("./routes/campgrounds"),
    postRoutes = require("./routes/posts"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp"); //Developer Database    
//mongoose.connect("mongodb://brenton:niebauer@ds133920.mlab.com:33920/yelp_camp"); //Deployed Database
app.use(bodyParser.urlencoded({extended: true}));

//PASSPORT CONFIGURATIONS
app.use(require("express-session")({
    secret: "Lilly is my youngest child",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
//Re-encoding the data and placing it back into the session
passport.serializeUser(User.serializeUser());
//Reading the session, extracting the data, decoding it
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public")); //Tells the App about the Public folder
app.use(methodOverride("_method"));
app.use(flash());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//seedDB();

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/post", postRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App is running");
});