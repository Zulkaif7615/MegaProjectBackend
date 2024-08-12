import { asyncHandler } from "../utlis/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Congrats!" ,
    userName: "Raja Zulkaif Janjua"
  });
});


// informational:1** success::2** redirection:3** client_error:4** Server_error:5**
export {registerUser}
