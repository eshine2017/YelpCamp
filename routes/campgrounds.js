var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX - show all campgrounds
router.get("/", function(req, res) {
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) console.log(err);
        else res.render("campgrounds/index", {campgrounds: allCampgrounds});
    });
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to camgrounds array
    var name = req.body.name;
    var image = req.body.image
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author};
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) console.log(err);
        // redirect back to campgrounds page
        else res.redirect("/campgrounds");
    });
});

// NEW - show form to create campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
    // find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) console.log(err);
        // render show template with that campground
        else res.render("campgrounds/show", {campground: foundCampground});
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) res.redirect("/campgrounds");
        else res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) res.redirect("/campgrounds");
        else res.redirect("/campgrounds");
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampgound) {
        if (err) res.redirect("/campgrounds");
        else res.redirect("/campgrounds/" + req.params.id);
    });
});

module.exports = router;