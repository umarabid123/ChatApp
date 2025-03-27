const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require('./models/user')
const { Strategy } = require("passport-local");
const localStrategy = require("passport-local").Strategy;

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const { registrationController, loginController } = require("./controller/authController");



mongoose
	.connect(
		"mongodb+srv://muhammadumer:abid.12345@cluster0.a1umk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log("mongodb connected");
	})
	.catch((err) => {
		console.error("db have not connected something goes wrong", err);
	});
	
	app.post("/register", registrationController);

	app.post("/login", loginController);
	app.get("/users/:userId", (req,res) =>{
		const loggedInUser =req.params.userId;

		User.findOne({_id:{$ne:loggedInUser}}).then((res) =>{
			res.status(200).json(users)
		}).catch((error) =>{
			console.log("Error in retrieving users:", error)
			res.status(500).json({massage:"Error in retrieving users data"})
		})

	})

app.listen(port, () => console.log("Server running on port 8000"));
