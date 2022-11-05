const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/students-apis")
.then(()=>{
    console.log("Connection is successful....");
}).catch((err)=>{
    console.log(err);
});