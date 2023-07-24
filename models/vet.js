import mongoose, { Schema, models, model } from "mongoose";

const vetSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter vet name"],
    },

    address: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },
    skills: [
      {
        type: Date,
      },
    ],
    education: {
      type: String,
    },
    experience: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Vet = models.Vet || model("Vet", vetSchema);

export default Vet;
