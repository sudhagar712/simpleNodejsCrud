const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const productRoutes = require("./routes/productRoutes")
const connectDB = require("./config/db")
const path = require('path')

dotenv.config()
const app = express();

const folderLocation = path.join(__dirname, "uploads")
app.use("/uploads", express.static(folderLocation))

app.use(cors())
app.use(express.json())

app.use("/api/products", productRoutes);


const PORT = process.env.PORT || 8900

connectDB()
app.listen(PORT, ()=> {
    console.log(`Server is running on Port ${PORT}`)
})