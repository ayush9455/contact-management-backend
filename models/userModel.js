const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a user name"],
        },
        email: {
            type: String,
            required: [true, "Please add a user email"],
            uniique: [true, "Email address already used"]
        },
        password: {
            type: String,
            required: [true, "Please add a user password"],
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt
    }
);

module.exports = mongoose.model("User", userSchema);// Use singular model name (Contact)
