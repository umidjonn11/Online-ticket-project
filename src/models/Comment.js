import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    article: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
  },
  { timestamps: true }
);

 export const Comment = mongoose.model("Comment", CommentSchema);

