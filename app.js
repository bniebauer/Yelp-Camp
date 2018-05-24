var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./modules/campground"),
    Post = require("./modules/post"),
    User = require("./modules/user"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    seedDB = require("./seeds");
    
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp");
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
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//seedDB();

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App is running");
});