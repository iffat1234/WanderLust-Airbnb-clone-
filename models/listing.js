const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
       type: String,
       required: true,
    },
    description: String,

    image:{
        type: String,
         default:  "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
         set: (v) => v===""? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" : v,//createing default images
    },
    price: Number,
    location: String,
    country: String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
});

//handling deleted listing (mongoose middleware)
listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});

const listing = mongoose.model("listing" , listingSchema);

// export in app.js
module.exports = listing;