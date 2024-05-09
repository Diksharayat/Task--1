const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Userss = require("../../models/User");

// Function to generate OTP
function generateOTP() {
  const randomNumber = crypto.randomInt(0, 999999);
  const otp = randomNumber.toString().padStart(6, "0");
  return otp;
}

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "diksharayat1020@gmail.com",
    pass: "nbhf zyfn bimr htzj",
  },
});

// Function to send OTP via email
async function sendOTPByEmail(email, otp) {
  const mailOptions = {
    from: "diksharayat1020@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. Please use it to log in.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw new Error("Failed to send OTP: " + error.message);
  }
}
// Function to send reset password email
async function sendEmail(req, res) {
  const { email } = req.body;
  const mailOption = {
    to: email,
    subject: "Your Reset password link",
    html: `Click on the link to reset password <a href="https://663cb102f8517500080fa2dc--kaleidoscopic-speculoos-b05829.netlify.app/reset-password">https://663cbd379cf95b0008cf2fe9--kaleidoscopic-speculoos-b05829.netlify.app/reset-password</a>.`,
  };

  try {
    const info = await transporter.sendMail(mailOption);
    console.log("Reset password email sent successfully", info.response);
    res.json({
      status: "success",
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email: " + error.message);
  }
}




// Function to handle login and send OTP
async function loginUserAndSendOTP(req, res, email) {
  try {
    const otp = generateOTP();

    // Send OTP via email
    await sendOTPByEmail(email, otp);
    // await sendEmail(email);
    // Update user document with the generated OTP
    await Userss.findOneAndUpdate({ email }, { otp });

    // Retrieve the updated user document
    const userFound = await Userss.findOne({ email });

    // Return response with user details and message
    res.json({
      status: "success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateTokens(userFound._id),
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error during login and OTP sending:", error);
    res.status(500).json({ message: "Login and OTP sending failed" });
  }
}

// Login controller
const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Email and password are required" });
    }

    // Check if the email exists
    const userFound = await Userss.findOne({ email });
    if (!userFound)
      return res.status(401).json({ message: "Check email and password" });

    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch)
      return res.status(401).json({ message: "Check Password" });

    await loginUserAndSendOTP(req, res, email);
    // Send OTP via email
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

// Controller to verify OTP
const verifyOTPController = async (req, res) => {
  const { otp, email } = req.body;
  console.log(email);
  console.log(otp);
  try {
    // Find the user by email
    const userFound = await Userss.findOne({ email });

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(userFound);

    // Compare the received OTP with the stored OTP
    if (otp !== userFound.otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};




const logoutUserController = async (req, res) => {
  try {
  
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
   
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Logout failed" });
  }
}


const registerUserController = async (req, res) => {  
  const { fullname, email, password } = req.body;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  console.log(email, password, fullname);

  try {
    // check three steps
    // check if email exists

    const userFound = await Userss.findOne({ email });
    if (userFound) {
      return res.status(400).json({ message: "user Already exists" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    //  check if the fields are empty

    if (!fullname || !email || !password) {
      return res.json("pls fill all the fields");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await Userss.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      message: "user registered",
      fullname: user.fullname,
      email: user.email,
      password: hashedPassword,
      id: user._id,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};



const profileUserController = async (req, res) => {
  //how to get the token from header

  try {
    res.json({ msg: "profile route" });
  } catch (error) {
    res.json(error);
  }
};

const deleteUserController = async (req, res) => {
  try {
    res.json({ msg: "delete route" });
  } catch (error) {
    res.json(error);
  }
};

const updateUserController = async (req, res) => {
  try {
    res.json({ msg: "update route" });
  } catch (error) {
    res.json(error);
  }
};

function generateTokens(user) {
  const secretKey = "just-chilling";
  const accessToken = jwt.sign(
    {
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
    },
    secretKey,
    { expiresIn: "6h" }
  );
  return { accessToken };
}

// middleware for authentication
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  const tokenArray = token.split("");
  const tokenWithoutBearer = tokenArray[1];
  if (!tokenWithoutBearer) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(tokenWithoutBearer, "just-chilling", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      const userRoles = user.role;
      req.body.userRoles = userRoles;
      const fullname = user.fullname;
      req.body.fullname = fullname;
      next();
    }
  });
}


module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  profileUserController,
  deleteUserController,
  updateUserController,
  authenticateToken,
  loginUserAndSendOTP,
  verifyOTPController,
  sendEmail
};
