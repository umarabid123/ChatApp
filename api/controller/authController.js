const User = require("../model/user");
const jwt = require("jsonwebtoken");
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

const createToken = (userId) => {
	const payload = { userId: userId };

	const token = jwt.sign(payload,"abcd3#dsj$`",{expiresIn:"1h"})
	return token
};

const loginController = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(404)
			.json({ massage: "Email and Password is required" });
	}
	User.findOne({ email }).then((user) => {
		if (!user) {
			return res.status(404).json({ massage: "User not Found" });
		}
		if (user.password !== password) {
			return res.status(404).json({
				massage: "Enter Correct Password",
			});
		}
		const token = createToken(user._id);
		res.status(200)
			.json({ token })
			.catch((error) => {
				console.log(
					"Error something went wrong in finding user:",
					error
				);
				res.status(500).json({ massage: "Internal Server error" });
			});
	});
};

module.exports = { registrationController, loginController };
