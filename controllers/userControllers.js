const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/userRoutes');

const register = asyncHandler(async (req, res) => {
    console.log(`The Request Body is`, req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User Already Registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
        res.status(200).json({ message: "Registered User!", error: false, _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("Unable To Create User!");
    }

});

const login = asyncHandler(async (req, res) => {
    console.log(`The Request Body is`, req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (!userAvailable) {
        res.status(400);
        throw new Error("User Not Exist");
    }
    if (userAvailable && (await bcrypt.compare(password, userAvailable.password))) {
        const accessToken = jwt.sign({
            user: {
                name: userAvailable.name,
                email: userAvailable.email,
                _id: userAvailable._id
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m", })
        res.status(200).json({ message: "Logged In User!", error: false, accessToken });
    }

});

const getUser = asyncHandler(async (req, res) => {

    const {
        name,
        email,
        _id
    } = req.user;

    const user = await User.findOne({ _id });
    res.status(200).json({ message: "User Fetched!", error: false, user });
});

module.exports = { register, login, getUser };