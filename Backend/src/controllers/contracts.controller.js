import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Organization } from "../models/org.model.js";
import { Contract } from "../models/contracts.model.js";



const getKycIssuedFromUser = asyncHandler(async(req, res)=>{
    const{ hashAddress }= req.params;
    const totalCount = await Contract.countDocuments({ issuerHash: hashAddress });

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            totalCount,
            "Total KYC count retrieved successfully"
        )
    )

})

const createKyc = asyncHandler(async(req, res) =>{
    const {
    userHash,
    issuerHash, // this should be an object with title, terms, etc.
  } = req.body;

  if (!userHash || !issuerHash) {
    throw new ApiError(400, "userHash, issuerHash, and contractDetails are required");
  }

  // Check if contract already exists for user
  const existing = await Contract.findOne({ userHash });
  if (existing) {
    throw new ApiError(409, "A contract already exists for this userHash");
  }

  const newContract = await Contract.create({
    userHash,
    issuerHash,
  });

  console.log("Contract Block id :"+ newContract._id);
  console.log("Issuer id : " + newContract.issuerHash);
  console.log("User Id : " + newContract.userHash);
  console.log("Valid Until : "+ newContract.validUntil);

  return res.status(201).json(
    new ApiResponse(201, newContract, "KYC Contract created successfully")
  );
})


export {getKycIssuedFromUser , createKyc};