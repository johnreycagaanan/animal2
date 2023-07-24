import mongoose, { Schema, models, model } from "mongoose";
const validator = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: [true, "Username already taken"],
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isAlphanumeric(value);
          f;
        },
        message: "Username can only contain letters and numbers.",
      },
    },

    email: {
      type: String,
      required: [true, "An email is required!"],
      unique: [
        true,
        "The email has already been registered, try to login please!",
      ],
      validate: (email) => {
        return validator.isEmail(email);
      },
    },

    password: {
      type: String,
      required: [true, "Please add a password!"],
      validate: (password) => {
        return validator.isStrongPassword(password);
      },
    },
    firstName: {
      type: String,
      required: [true, "Please input your first name!"],
      trim: true,
      maxlength: [100, "First name is too long"],
    },
    middleName: {
      type: String,
      trim: true,
      maxLength: [50, "Middle name is too long"],
    },
    lastName: {
      type: String,
      required: [true, "Please input your last name!"],
      trim: true,
      maxlength: [50, "Last name is too long"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Please enter your phone number!"],
      unique: [true, "Phone number already taken!"],
    },

    gender: {
      type: String,
      required: [true, "Please add a gender!"],
      enum: ["Male", "Female", "Other"],
    },

    birthday: {
      type: Date,
      min: "1900-01-01",
      max: Date.now(),
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verification: {
      type: String,
    },

    userType: {
      type: String,
      required: true,
      enum: ["admin", "staff", "user"],
      default: "user",
    },
    address: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      // required: true,
    },
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

export default User;
