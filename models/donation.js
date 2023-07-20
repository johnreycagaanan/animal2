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

const Donation = models.donations || model("Donation", donationSchema);

export default Donation;
