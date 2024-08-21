import { asyncHandler } from "../utlis/asyncHandler.js";
import { ApiError } from "../utlis/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utlis/cloudinary.js";
import { ApiResponse } from "../utlis/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get data from user
  // add middleware for file uploading
  // check validation
  // if user is already exit {email - username}
  // check for image,check for avatar
  // upload them to cloudinary , check avatar
  // create user object  -- create entry in db
  // remve password and refresh token field from response
  // check for user creation
  // return response
  // res.status(200).json({
  //   message: "Congrats!" ,
  //   userName: "Raja Zulkaif Janjua"
  // });
  const { username, fullName, email, password } = req.body;

  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const exitedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (exitedUser) {
    throw new ApiError(409, "User with email and password is already exit");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }

  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar image is reuired");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  
  return res
    .status(201)
    .json(
      new ApiResponse(201, createdUser, "User registered Successfully")
    );
});



// informational:1** success::2** redirection:3** client_error:4** Server_error:5**
export { registerUser };
