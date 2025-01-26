import express from "express"; 
import UserRequest from "../Models/request.js";
import sendResponse from "../helper/sendResponse.js"; // Assuming this is your response helper
import verifyToken from "../Middleware/token.js"; // Assuming this is your token verification middleware

const LoanRoute = express.Router();

// Route to handle loan requests
LoanRoute.post("/userLoanRequest", async (req, res) => {
  const { email, name, cnic } = req.body;

  // Validate the incoming data
  if (!email || !name || !cnic) {
    sendResponse(res, 400, null, "Please provide all the details", true);
    return;
  }

  try {
    // Check if a request already exists with the same email
    const existingUserRequest = await UserRequest.findOne({ email });

    if (existingUserRequest) {
      // Return a response indicating the email is already in use
      return sendResponse(res, 400, null, "This email is already associated with a loan request", true);
    }

    // Create a new user request document
    const newUserRequest = new UserRequest({
      email,
      name,
      cnic,
    });

    // Save the new document to the database
    await newUserRequest.save();

    // Send a success response
    sendResponse(res, 201, null, "User request submitted successfully!", null);
    
  } catch (error) {
    // Catch the duplicate key error and handle it
    if (error.code === 11000) {
      // Duplicate email error
      return sendResponse(res, 400, null, "This email is already in use.", true);
    }

    // Handle other server errors
    console.error(error);
    return sendResponse(res, 500, null, "Server error", true);
  }
});

export default LoanRoute;
