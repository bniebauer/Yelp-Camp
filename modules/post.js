var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
   title: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      },
      username: String
   }
});

module.exports = mongoose.model("Post", postSchema);