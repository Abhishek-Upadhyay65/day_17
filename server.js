const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("DB NOT CONNECTED", err));


app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("server started at" + PORT);

});
