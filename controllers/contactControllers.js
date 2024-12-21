const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactsModel');
const { default: mongoose } = require('mongoose');

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({
        user_id: req.user._id
    });
    res.status(200).json({ message: "Get All Contatcts", error: false, contacts: contacts });
});
const createContact = asyncHandler(async (req, res) => {
    console.log(`The Request Body is`, req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields Are Mandatory");
    }
    const newContact = await Contact.create({
        name, email, phone, user_id: req.user._id
    });
    console.log("Sending success response");
    res.status(200).json({ message: "Create Contatct", error: false, contact: newContact });
});
const updateContact = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404); // Bad Request
        throw new Error("Invalid Contact ID");
    }
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("No Contact Found");
    }
    if (contact.user_id.toString() != req.user._id) {
        res.status(403);
        throw new Error("Not Authorized To Update This Contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: `Update Contatct ${req.params.id}`, updatedContact: updatedContact, error: false })
});
const deleteContact = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404); // Bad Request
        throw new Error("Invalid Contact ID");
    }
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("No Contact Found");
    }
    if (contact.user_id.toString() != req.user._id) {
        res.status(403);
        throw new Error("Not Authorized To Delete This Contact");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `Deleted Contatct ${req.params.id}`, error: false })
});
const getContactById = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404); // Bad Request
        throw new Error("Invalid Contact ID");
    }
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("No Contact Found");
    }
    if (contact.user_id.toString() != req.user._id) {
        res.status(403);
        throw new Error("Not Authorized To Retrieve This Contact");
    }
    res.status(200).json({ message: "Get Contact By id", error: false, contact: contact });
});
module.exports = { getContact, createContact, updateContact, deleteContact, getContactById };