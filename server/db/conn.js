const mongoose = require("mongoose");

const DB = "mongodb+srv://Jay:jay789@cluster0.amoxl.mongodb.net/CrudApp?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useUnifiedTopology:true
}).then(() => console.log("connection start")).catch((error) => console.log(error.message));