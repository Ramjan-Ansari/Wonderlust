const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.creatReview = async (req, res)=>{
    // console.log(req.params.id);
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  // console.log(newReview);
  newReview.author = req.user._id;
  await listing.save();
  await newReview.save();
  // console.log("new review saved");
  // res.send("new review saved");
  req.flash("sucess", "New review created");
  res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async (req, res)=>{
  let {id , reviewId} = req.params;

  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findById(reviewId);
  res.redirect(`/listings/${id}`); 
}