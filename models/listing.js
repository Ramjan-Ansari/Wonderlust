const { string, required } = require("joi");
const mongoose = require("mongoose");
const { listingSchema } = require("../schema");
const {Schema} = mongoose;
const Review = require("./review.js")

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
  },


  
});

ListingSchema.post("findOneAndDelete",async (listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
})

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;












// const ListingSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     require: true,
//   },
//   description: String,
//   image: {
//     type: String,
//     filename: String,
//     url: String,
//     default: "https://images.unsplash.com/photo-1630618357937-bb2aa9c8c911?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
//     set: (v) =>
//       v === ""
//         ? "https://images.unsplash.com/photo-1630618357937-bb2aa9c8c911?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8"
//         : v,
//   },
//   price: Number,
//   location: String,
//   country: String,
// });
