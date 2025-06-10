const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const validatelisting = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//index route
router.get("/", wrapAsync(listingController.index));

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show router
router.get("/:id", wrapAsync(listingController.showListing));

//create router
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  validatelisting,
  wrapAsync(listingController.creatListing)
);

//Edit router
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(listingController.renderExitForm)
);

//Update router
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validatelisting,
  wrapAsync(listingController.updateListing)
);

//Delete router
router.delete("/:id", isLoggedIn, wrapAsync(listingController.destroyListing));

module.exports = router;
