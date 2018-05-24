var mongoose = require("mongoose"),
    Campground = require("./modules/campground"),
    Post = require("./modules/post");

var data = [
    {
        name: "Windy Meadows",
        image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn01.wallconvert.com%2F_media%2Fwallpapers_1920x1080%2F1%2F3%2Fcamping-27623.jpg&f=1",
        description: "Necessitatibus consequatur enim quis consequuntur. Aut officia velit qui similique sed facilis totam iste. At debitis perspiciatis consequatur atque aspernatur fuga repellat maiores. Minima eaque laboriosam aut asperiores. Voluptate accusamus dolorum nemo ex dolorum et. Aliquam minus iure non reiciendis velit vel ullam."
    },
    {
        name: "Desert Lane",
        image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn01.wallconvert.com%2F_media%2Fwallpapers_1920x1080%2F1%2F3%2Fcamping-27623.jpg&f=1",
        description: "Necessitatibus consequatur enim quis consequuntur. Aut officia velit qui similique sed facilis totam iste. At debitis perspiciatis consequatur atque aspernatur fuga repellat maiores. Minima eaque laboriosam aut asperiores. Voluptate accusamus dolorum nemo ex dolorum et. Aliquam minus iure non reiciendis velit vel ullam."
    },
    {
        name: "Snowy Trail",
        image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn01.wallconvert.com%2F_media%2Fwallpapers_1920x1080%2F1%2F3%2Fcamping-27623.jpg&f=1",
        description: "Necessitatibus consequatur enim quis consequuntur. Aut officia velit qui similique sed facilis totam iste. At debitis perspiciatis consequatur atque aspernatur fuga repellat maiores. Minima eaque laboriosam aut asperiores. Voluptate accusamus dolorum nemo ex dolorum et. Aliquam minus iure non reiciendis velit vel ullam."
    },
    {
        name: "Jungle Oasis",
        image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn01.wallconvert.com%2F_media%2Fwallpapers_1920x1080%2F1%2F3%2Fcamping-27623.jpg&f=1",
        description: "Necessitatibus consequatur enim quis consequuntur. Aut officia velit qui similique sed facilis totam iste. At debitis perspiciatis consequatur atque aspernatur fuga repellat maiores. Minima eaque laboriosam aut asperiores. Voluptate accusamus dolorum nemo ex dolorum et. Aliquam minus iure non reiciendis velit vel ullam."
    }
]
function seedDB() {
    Campground.remove({}, function(err){
        /*if(err){
            console.log(err);
        } else {
            console.log("Database has been cleared");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(campground.name+" was added.");
                        Post.create(
                            {
                                title: "This place is dank, yo",
                                author: "Steve Earl"
                            },
                        function(err, post){
                            if(err){
                                console.log(err);
                            } else {
                                campground.posts.push(post);
                                campground.save();
                            }
                        });
                    }
                });
            });
        }*/
    });
    
}

module.exports = seedDB;