const User = require('../models/user');
const bcrypt = require('bcrypt');

const signInController = async (req,res)=>{
    try{
        const email = req.body.email;
        const pass = req.body.password;
        if(!email || !pass){
            return res.status(400).json({
                success: false,
                message: "Please send the Credentials"
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid Email Id"
            });
        }
        const hashedpass = user.password
        const ismatched = await bcrypt.compare(pass,hashedpass);
        if(!ismatched){
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User Login Successful",
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    }
    catch(err){
        console.log("Error in Login User", err);
        return res.status(500).json({
            success: false,
            message: "Error in User SignIn",
        })
    }

}

const signUpController = async (req,res)=> {
    try{
        const { email, password, firstName, lastName } = req.body;
        if(!email || !firstName || !password){
            return res.status(400).json({
                success: false,
                message: "Please Send Complete Data"
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                success: false,
                message: "User Already Exist"
            });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword
        });
        await newUser.save();
        console.log("User Signed Up Successfully");
        return res.status(200).json({
            success: true,
            message: "User Sign Up Successfully"
        });
    }   
    catch(err){
        console.error('Signup error:', err);
        return res.status(500).json({
            success: false,
            message: "Internal server error during SignUp",
            error: err.message
        });
    }
}

module.exports = {signInController, signUpController};