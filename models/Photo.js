import mongoose from "mongoose";
const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    user: { type: Schema.Types.ObjectId, ref: "User" }, // reference to the User model
    userName: String,
  },
  { timestamps: true }
);

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;
