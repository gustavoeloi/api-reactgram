import mongoose from "mongoose";
const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    image: String,
    description: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    userName: String,
  },
  { timestamps: true }
);

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;
