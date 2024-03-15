import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res)=>{
    try{
        const {fullName, username, password, confirmPassword, consumer_or_businessRepresentative} = req.body;
        console.log(fullName, username, password, confirmPassword, consumer_or_businessRepresentative);
        console.log("--------------------------------------");
        if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}
		const user = await User.findOne({ username });
		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}
        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			consumer_or_businessRepresentative
		});
        if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				consumer_or_businessRepresentative: newUser.consumer_or_businessRepresentative,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
    }catch(error){
        console.log("error at signup");
        console.log(error);
        res.status(500).json({
            error: "internal server error"
        })
    }
}
export const login = async (req, res)=>{
    try{
        const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			consumer_or_businessRepresentative: user.consumer_or_businessRepresentative,
		});
    }catch(error){
        console.log("error at login");
        console.log(error);
        res.status(500).json({
            error: "internal server error"
        })
    }
}
export const logout = (req, res)=>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}