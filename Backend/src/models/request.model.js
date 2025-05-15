import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    senderHashAddress: {
      type: String,
      required: [true, 'Sender hash address is required'],
      trim: true,
      unique : true
    },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending'
    },
    decidedByOrgHashAddress: {
      type: String,
      trim: true,
      validate: {
        validator: function(value) {
          return this.status === 'pending' || (value && value.length > 0);
        },
        message: 'Organization hash address is required when request is decided'
      }
    },
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

export const Request = mongoose.model('Request', requestSchema);
