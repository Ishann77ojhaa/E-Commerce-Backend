const User = require("../../../Model/UserModel");

// =========================================
// GET ALL USERS
// =========================================

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({
      user_Role: "Customer"
    })
      .select("-user_Password -OTP -isOTPVerified -__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Users Fetched Successfully",
      data: users
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message
    });
  }
};


// =========================================
// GET SINGLE USER
// =========================================

exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("-user_Password -OTP -isOTPVerified -__v");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User Fetched Successfully",
      data: user
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message
    });
  }
};


// =========================================
// DELETE USER
// =========================================

exports.deleteuser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Please Provide ID"
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    // Don't allow deleting Admin
    if (user.user_Role === "Admin") {
      return res.status(403).json({
        message: "Admin users cannot be deleted"
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User Deleted Successfully",
      data: null
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message
    });
  }
};