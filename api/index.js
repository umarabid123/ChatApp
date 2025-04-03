const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./model/user');
const {Strategy} = require('passport-local');
const localStrategy = require('passport-local').Strategy;

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
const {
  registrationController,
  loginController,
} = require('./controller/authController');

mongoose
  .connect(
    'mongodb+srv://muhammadumer:abid.12345@cluster0.a1umk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('mongodb connected');
  })
  .catch(err => {
    console.error('db have not connected something goes wrong', err);
  });

app.post('/register', registrationController);

app.post('/login', loginController);
app.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await User.find({_id: {$ne: userId}});
    res.json(users);
  } catch (error) {
    console.log('Error', error);
  }
});

app.post('/sendrequest', async (req, res) => {
	const {senderId, receiverId, message} = req.body
	const receiver = await  User.findOne({receiverId})
	if(!receiver){
		return res.status(404).json({message:'Receiver not found'})
	}
	receiver.request.push({form:senderId,message})
	await receiver.save()

	res.status(200).json({message:'Request send successfully'})
});

app.listen(port, () => console.log('Server running on port 8000'));
