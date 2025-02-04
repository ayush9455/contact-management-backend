const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config()
connectDb();
const app = express();
const port = process.env.PORT || 5002;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.get('/', (req, res) => {
    res.json({ message: "Server is Live" });
});
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});
