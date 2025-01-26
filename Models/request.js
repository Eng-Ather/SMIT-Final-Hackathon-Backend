// models/User.js
import mongoose from "mongoose";

const userRequestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  cnic: {
    type: Number,
    required: true,
    unique: true,

  },
});

const UserRequest = mongoose.models.userRequestForLoan||mongoose.model('userRequestForLoan', userRequestSchema);
export default UserRequest;