const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require("./routes/authRoute");
const cookieParser = require('cookie-parser');

require('dotenv').config()
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.get('/', (req,res)=>{
    res.send('Welcome to note-bay Api');
});
app.use('/auth',authRoutes);

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{
        console.log(`Server is Running on port ${PORT}`);
    });
}).catch((error)=>{
    console.log("Error in Connection with DB");
    console.error(error);
});



