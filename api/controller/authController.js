const User = require("../model/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const registrationController = async (req, res) => {
	try {
		console.log("Received request at /register"); // Debugging

		const { name, email, password, image } = req.body;
		console.log("Request Body:", req.body); // Log request data

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const newUser = new User({ name, email, password, image });
		await newUser.save();

		res.status(201).json({
			message: "User registered successfully",
			user: newUser,
		});
	} catch (err) {
		console.error("Error:", err);
		res.status(500).json({ error: "Something went wrong in registration" });
	}
};

// create token function

// const createToken = (userId) => {
// 	const payload = { userId: userId };

// 	const token = jwt.sign(payload,"abcd3#dsj$`",{expiresIn:"1h"})
// 	return token
// };

const loginController =async (req, res) => {
	try {
	  const { email, password } = req.body;
  
	  const user = await User.findOne({ email });
	  if (!user) {
		return res.status(401).json({ message: "Invalid email" });
	  }
  
	  if (user.password !== password) {
		return res.status(401).json({ message: "Invalid password" });
	  }

	  const secretKey = crypto.randomBytes(32).toString('hex');; // ✅ Use a fixed secret key
	  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });

	  res.status(200).json({ token });
	} catch (error) {
	  console.log("Error logging in:", error);
	  res.status(500).json({ message: "Error logging in" });
	}
};

module.exports = { registrationController, loginController };
