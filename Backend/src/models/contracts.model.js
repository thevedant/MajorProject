import mongoose from "mongoose";
const contractSchema = new mongoose.Schema(
    {
        userHash :{
            type: String,
            required: [true, 'Hash address is required'],
            unique: true,
            trim: true,
        },

        issuerHash : {
            type: String,
            required: [true, 'Organization name is required'],
            trim: true,
        } ,

        validUntil: {
            type: Date,
            // Default to one year from now
            default: function() {
              const oneYearFromNow = new Date();
              oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
              return oneYearFromNow;
            }
          }
        },
        {
          timestamps: true // Adds createdAt and updatedAt fields automatically
        },
    
);


export const Contract = mongoose.model("Contract" ,contractSchema);