import mongoose, { Schema, models, model } from "mongoose";

const CheckupSchema = new Schema({
  accompaniedBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  remarks: {
    type: String,
  },
});

const adoptionSchema = new Schema(
  {
    adopter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adoptee: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    reason: {
      type: String,
      required: [true, "Please input reason for adoption"],
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    parentJob: {
      type: String,
      required: [true, "Please indicate the furparent's job"],
    },
    checkups: [CheckupSchema],
  },
  {
    timestamps: true,
  }
);

const Adoption = models.Adoption || model("Adoption", adoptionSchema);

export default Adoption;
