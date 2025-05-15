import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    hashAddress: {
      type: String,
      required: [true, 'Hash address is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    aadhar: {
      type: String,
      required: [true, 'Aadhar number is required'],
      unique: true,
      trim: true,
    },
    pan: {
      type: String,
      required: [true, 'PAN number is required'],
      unique: true,
      trim: true,
      uppercase: true, // Keeps PAN in uppercase (optional)
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt`
  }
);

export const User = mongoose.model("User" , userSchema)