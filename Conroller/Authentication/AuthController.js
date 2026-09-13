const User = require("../../Model/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../../Services/sendEmail")
require("dotenv").config()

//Register User Login 
exports.registerUser = async(req,res)=>{
    const {user_email,user_password,user_phone,user_name} = req.body
if(!user_email || !user_password || !user_phone || !user_name){
   return res.status(400).json({
        message : "Please provide email, phone, password"
    })
}

//Check if email is already exists or not 
     const founduser =   await User.find({user_Email: user_email})

     if(founduser.length > 0){
            return res.status(400).json({
                message : "Email Already Exists!!"
            })
     }

 const userData = await User.create({
            user_Email : user_email,
            user_Phone : user_phone,
            user_Name : user_name,
            user_Password : bcrypt.hashSync(user_password,10)
            
 })
  res.status(201).json({
    message : "User Register Successfully",
    data : userData
  })
}


//login User 
exports.loginUser = async (req,res)=>{
    const {user_email, user_password} = req.body;

    if(!user_email || !user_password){
        return res.status(400).json({
                message : "Enter Email and Password"
            })
  }

  // Check if that email exists or not 
  const founduser = await User.findOne({user_Email: user_email}).select("+user_Password")

     if(!founduser){
            return res.status(404).json({
                message : "User with that Email Doesn't exists"
            })
     }

    
//Password Check
 const ismatched = bcrypt.compareSync(user_password, founduser.user_Password)
     if(!ismatched){
        return res.status(400).json({
            message : "Invalid Password!!"
        })
    }


    //Token 
     const token = jwt.sign({id : founduser._id},process.env.SECRET_KEY, {
        expiresIn : '30d'
      });


         res.status(200).json({
            message : "User Logged in Successfully",
            data : {
                    id: founduser._id,
                    name: founduser.user_Name,
                    email: founduser.user_Email,
                    phone: founduser.user_Phone
                    },
            token : token
        })
}

//forgot password
exports.forgotpassword = async (req, res) => {
    try {
        console.log("1. Route started");

        const { user_email } = req.body;

        console.log("2. Email:", user_email);

        const user = await User.findOne({
            user_Email: user_email
        });

        console.log("3. User found:", !!user);

        if (!user) {
            return res.status(400).json({
                message: "The Email You Entered is not registered"
            });
        }

        const OTP = Math.floor(1000 + Math.random() * 9000);

        console.log("4. OTP generated:", OTP);

        user.OTP = OTP;

        await user.save();

        console.log("5. User saved");

        await sendEmail({
            email: user.user_Email,
            subject: "IshShop Password Reset OTP",
            message: `Your password reset OTP is: ${OTP}. This OTP is valid for a limited time.`
        });

        console.log("6. Email sent successfully");

        return res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.error("ERROR:", error);

        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};


//Verify-OTP-API
exports.VerifyOTP = async (req, res) => {

    const { user_email, otp } = req.body;

    if (!user_email || !otp) {
        return res.status(400).json({
            message: "Please Provide Email and OTP"
        });
    }

    const UserExists = await User.findOne({
        user_Email: user_email
    }).select("+OTP +isOTPVerified");

    if (!UserExists) {
        return res.status(400).json({
            message: "Email is not registered"
        });
    }

    if (UserExists.OTP !== Number(otp)) {
        return res.status(400).json({
            message: "OTP Invalid"
        });
    }

    // OTP successfully verified
    UserExists.OTP = undefined;
    UserExists.isOTPVerified = true;

    await UserExists.save();

    return res.status(200).json({
        message: "OTP verification Successful"
    });
};


//Reset-Password-API
exports.ResetPassword = async (req, res) => {

    const {
        user_email,
        newpassword,
        confirmpassword
    } = req.body;

    if (!user_email || !newpassword || !confirmpassword) {
        return res.status(400).json({
            message: "Please provide email, new password and confirm password"
        });
    }

    if (newpassword !== confirmpassword) {
        return res.status(400).json({
            message: "Password Doesn't match"
        });
    }

    const UserExists = await User.findOne({
        user_Email: user_email
    }).select("+isOTPVerified");

    if (!UserExists) {
        return res.status(400).json({
            message: "Email is not registered"
        });
    }

    // Make sure OTP was actually verified
    if (!UserExists.isOTPVerified) {
        return res.status(400).json({
            message: "Please verify OTP first"
        });
    }

    // Change password
    UserExists.user_Password = bcrypt.hashSync(newpassword, 10);

    // Reset verification state
    UserExists.isOTPVerified = false;

    await UserExists.save();

    return res.status(200).json({
        message: "Password Reset Successfully"
    });
};


//get me
exports.getMe = async (req, res) => {
  res.status(200).json({
    data: {
      id: req.user._id,
      name: req.user.user_Name,
      email: req.user.user_Email,
      phone: req.user.user_Phone
    }
  });
};
    












