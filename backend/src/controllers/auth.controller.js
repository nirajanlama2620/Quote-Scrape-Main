import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async(req, res) => {
    const {username, password} = req.body

     try {
        if(!username || !password) {
            return res.status(400).json({ message: "All fields are required"});
        }

        if(password.length < 5) {
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }
        const user = await User.findOne({username})
        if(user) return res.status(400).json({ message: "UserName already exists" });

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            username,
            password:hashPassword
        })

        if(newUser){
            // generate jwt token here
            generateToken(newUser._id,res)
            await newUser.save();
            res.status(201).json({
            message:"Signup successful",
                _id: newUser._id,
                username: newUser.username,
            })
        }else{
            res.status(400).json({ message: "Invalid user data " })
        }
     } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
     }
}

export const login = async (req, res) => {
    
    const { username, password } = req.body
    try {
        const user = await User.findOne({username})

        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Invalid credentials"});
        }
        const token = generateToken(user._id, res);

         res.status(200).json({
            token,
            user: {
                _id: user._id,
                username: user.username,
            }
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

