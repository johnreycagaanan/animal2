import mongoose, { Schema, models, model } from "mongoose";
const validator = require("validator");

const volunteerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: (email) => {
        return validator.isEmail(email);
      },
    },

    firstName: {
      type: String,
      trim: true,
      required: [true, "First name required"],
      maxlength: [100, "First name is too long"],
    },

    lastName: {
      type: String,
      trim: true,
      required: [true, "First name required"],
      maxlength: [50, "First name is too long"],
    },
    phoneNumber: {
      type: String,
      //   required: [true, "Please enter your phone number!"],
      //   unique: [true, "Phone number already taken!"],
    },

    address: {
      type: String,
    },
    workExperience: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Volunteer = models.volunteers || model("Volunteer", volunteerSchema);

export default Volunteer;
