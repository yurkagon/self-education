import mongoose, { Schema } from "mongoose";

const FeedbackSchema = new Schema(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
    mark: { type: Number, required: true, min: 1, max: 5 },
    feedback: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const FeedbackModel = mongoose.model("feedbacks", FeedbackSchema);

export default FeedbackModel;
