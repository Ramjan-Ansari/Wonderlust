//restucturing of review 
//express
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isReviewAther} = require("../middleware.js");

const controllerReview = require("../controllers/review.js")

const validaterreview = (req, res, next)=>{
  let {error} = reviewSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400, errMsg);
    }else{
      next();
    }
}


//Review 
//post review route
router.post("/",isLoggedIn, validaterreview, wrapAsync(controllerReview.creatReview));

//delete reviwe route
router.delete("/:reviewId",isLoggedIn,isReviewAther, wrapAsync(controllerReview.destroyReview));

module.exports = router;