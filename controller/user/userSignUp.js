const userModel = require('../../models/userModel');
const bcrypt = require("bcryptjs");

const isAdminEmails = ["praveenkumarsingh9714@gmail.com"]; // ✅ Ensure this matches .env

const userSignup = async (req, res) => {
    try {
        console.log("Incoming signup request:", req.body); // ✅ Log incoming data

        const { name, email, password, profilePic } = req.body;
        
        // Convert email to lowercase to prevent case sensitivity issues
        const formattedEmail = email.trim().toLowerCase(); 
        const hashedPassword = await bcrypt.hash(password, 10);
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email: formattedEmail });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        // Determine if the user is an admin
        const isAdmin = isAdminEmails.includes(formattedEmail); // ✅ Check email against admin list
        console.log(`Is admin: ${isAdmin}`); // ✅ Debug log

        // Save user with role and isAdmin
        const newUser = new userModel({
            name,
            email: formattedEmail,
            password: hashedPassword, // Store hashed password
            profilePic,
            role: isAdmin ? "ADMIN" : "GENERAL", // ✅ Assign role
            isAdmin: isAdmin, // ✅ Ensure correct isAdmin flag
        });

        await newUser.save();
        console.log("User saved:", newUser); // ✅ Debug log after saving

        res.status(201).json({ success: true, message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { userSignup };
