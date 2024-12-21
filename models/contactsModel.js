const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "Please add a contact name"],
        },
        email: {
            type: String,
            required: [true, "Please add a contact email"],
        },
        phone: {
            type: String,
            required: [true, "Please add a contact phone"],
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt
    }
);

module.exports = mongoose.model("Contact", contactSchema);// Use singular model name (Contact)
