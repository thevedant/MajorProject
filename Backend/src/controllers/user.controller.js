import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { hashAddress, name, email, phone, aadhar, pan, address } = req.body;

  // 1. Validate required fields
  if (
    [hashAddress, name, email, phone, aadhar, pan, address].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // 2. Check if user exists by hashAddress ONLY
  const existedUser = await User.findOne({ 
    $or: [{ hashAddress }, { email }, { aadhar }, { pan }]
  });
  if (existedUser) {
    throw new ApiError(409, "Wallet address already registered");
  }

  // 3. Create user
  const user = await User.create({
    hashAddress,
    name,
    email,
    phone,
    aadhar,
    pan,
    address
  });

  // 4. Return success response (excluding sensitive data)
  const createdUser = await User.findById(user._id).select("-aadhar -pan"); 
    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registering user")
    }
  
  return res
    .status(201)
    .json(
      new ApiResponse(201, createdUser, "User registered successfully")
    );
});




const loginUser = asyncHandler(async (req, res) => {
  const {hashAddress} = req.body;
  if(!hashAddress){
      throw new ApiError(400, "Hash address is required");
  }

  const user = await User.findOne({hashAddress});
  if(!user){
      throw new ApiError(404, "User not found");
  }

  return res
  .status(200)
  .json(
      new ApiResponse(
          200,
          user, // Return user directly instead of nesting
          "User logged in Successfully"
      )
  );
});


const getUser = asyncHandler(async(req,res)=>{
  const {hashAddress} = req.params;
  const user = await User.findOne({hashAddress});
   return res
  .status(200)
  .json(
      new ApiResponse(
          200,
          user, // Return user directly instead of nesting
          "User fetched Successfully"
      )
  );
})


export{
    registerUser, 
    loginUser, 
    getUser
}

