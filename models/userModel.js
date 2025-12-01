const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,  // ✅ Ensures consistent email storage
    },
    password: { type: String, required: true },
    profilePic: String,
    role: { type: String, default: "GENERAL", enum: ["ADMIN", "GENERAL"] }, // ✅ Enum for validation
    isAdmin: { type: Boolean, default: false },  
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
