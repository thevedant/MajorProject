import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Organization } from "../models/org.model.js";

// 1. Create Organization
const createOrganization = asyncHandler(async (req, res) => {
    const { organizationName, hashAddress, email, helplineNo } = req.body;
  
    // Validate required fields
    if (
      [organizationName, hashAddress, email, helplineNo].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }
  
    // Check for existing organization (by hashAddress or email)
    const existingOrg = await Organization.findOne({
      $or: [{ hashAddress }, { email }],
    });
  
    if (existingOrg) {
      throw new ApiError(
        409,
        "Organization with this wallet address or email already exists"
      );
    }
  
    // Create organization
    const organization = await Organization.create({
      organizationName,
      hashAddress,
      email,
      helplineNo,
    });
  
    return res
      .status(201)
      .json(
        new ApiResponse(201, organization, "Organization created successfully")
      );
  });
  
  // 2. Get Organization by Hash Address
  const getOrganization = asyncHandler(async (req, res) => {
    // console.log("hii");
    const { hashAddress } = req.body;
  
    const organization = await Organization.findOne({ hashAddress });
  
    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, organization, "Organization retrieved"));
  });


export {
    createOrganization ,
    getOrganization
}