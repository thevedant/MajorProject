import { asyncHandler } from "../utils/asyncHandler.js";
import { Request } from "../models/request.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateRequest = asyncHandler(async ( req, res )=>{
  // console.log("lelo")
    const {senderHashAddress} = req.params;


    const newRequest = await Request.create({
        senderHashAddress,
        status : "pending"
    });

    return res
    .status(201)
    .json(new ApiResponse(201, newRequest, "Request generated successfully"));


})


const getPendingRequests = asyncHandler(async (req, res) => {
    const requests = await Request.find({ status: 'pending' });
    return res.status(200).json(new ApiResponse(200, requests));
});



const searchRequests = asyncHandler(async (req, res) => {
    const { hashAddress } = req.query;
    
    const requests = await Request.find({ 
      senderHashAddress: hashAddress 
    });
    
    // console.log(requests);
    return res.status(200).json(new ApiResponse(200, requests));
    
});


const decideRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { decision,approvedBy } = req.body;

  const request = await Request.findByIdAndUpdate(
    requestId,
    {
      status: decision,
      decidedByOrgHashAddress: approvedBy,
    },
    { new: true }
  );

  res.status(200).json(new ApiResponse(200, request, "Request updated"));
});



export {decideRequest , searchRequests , generateRequest , getPendingRequests}
  