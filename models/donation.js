import mongoose, { Schema, models, model } from "mongoose";

const donationSchema = new Schema(
  {
    donor: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },

    donationType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Donation = models.Donation || model("Donation", donationSchema);

export default Donation;
