import mongoose, { Schema, models, model } from "mongoose";

const spayAndNeuterSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    details: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const SpayAndNeuter =
  models.SpayAndNeuter || model("SpayAndNeuter", spayAndNeuterSchema);

export default SpayAndNeuter;
