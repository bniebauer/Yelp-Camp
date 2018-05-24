var mongoose = require("mongoose");

var campgroundSchema = mongoose.Schema({
   name: String,
   image: String,
   description: String,
   creator: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      },
      username: String
   },
   posts: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post"
      }
   ]
});

module.exports = mongoose.model("Campground", campgroundSchema);