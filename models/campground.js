const mongoose = require("mongoose");
const Review = require("./review");
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    url: String,
    filename: String,
  }
)
// virtualでdatabaseにはないキーを使えるようにした
// 正規表現でurlの値を変えて小さいサイズの画像を取得
imageSchema.virtual("thumbnail").get(function(){
  return this.url.replace('/upload/', '/upload/w_200/')
})

const campgroundSchema = new Schema({
  title: String,
  images: [
    imageSchema
  ],
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    },
  ],
});

campgroundSchema.post('findOneAndDelete', async function(doc){
  if(doc) {
    await Review.deleteMany({
      _id:{
        $in: doc.reviews
      }
    })
  }
  console.log(doc.reviews);
})

module.exports = mongoose.model("Campground", campgroundSchema);
