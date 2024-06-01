import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  image_endpoint: {
    type: String,
    required: true,
  },
  user_gmail: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const userProfileModel = mongoose.models.userProfileModel || mongoose.model("userProfileModel", UserProfileSchema);
export default userProfileModel;
