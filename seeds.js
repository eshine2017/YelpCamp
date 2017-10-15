var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
        description: "Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent, a caravan, or a motorhome. Generally participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment."
    },
    {
        name: "Desert Mesa",
        image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
        description: "Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent, a caravan, or a motorhome. Generally participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment."
    },
    {
        name: "Canvon Floor",
        image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description: "Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent, a caravan, or a motorhome. Generally participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment."
    }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) console.log(err);
        else console.log("removed campgrounds");
        // // add a few campgrounds
        // data.forEach(function(seed) {
        //     Campground.create(seed, function(err, campground) {
        //         if (err) console.log(err);
        //         else console.log("added a campground");
        //         // create a comment
        //         Comment.create({
        //             text: "This place is great, but I wish there was internet",
        //             author: "Homer"
        //         }, function(err, comment) {
        //             if (err) console.log(err);
        //             else {
        //                 campground.comments.push(comment);
        //                 campground.save();
        //                 console.log("created new comment");
        //             }
        //         });
        //     });
        // });
    });
}

module.exports = seedDB;