const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 8000;


// app.get("/", (req,res) =>{
//     res.send("Hello from home page..");
// });

app.use(express.json());

//create a new student
// using normal promis method then() catch()
// app.post("/students", (req,res) =>{
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then( ()=>{
//         res.send(user);
//     }).catch( (err)=>{
//         res.send(err);
//     })
//     // res.send("hello from the other side");
// });

// using async await
app.post("/students", async(req,res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
    
})

// read the data of registered students

app.get("/students", async (req,res)=>{
    try {
        const studentData = await Student.find();
        res.send(studentData);
    } catch (error) {
        res.send(error);
    }
})

// get the individul students data
app.get("/students/:id", async (req,res)=>{
    try {
        const _id = req.params.id;
        const studentIndvidualData = await Student.findById(_id);
        res.status(200).send(studentIndvidualData);
    } catch (error) {
        res.status(500).send(error);
    }
})


// update the student
app.patch("/students/:id", async (req,res)=>{
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body,{new:true});
        res.send(updateStudents);
    } catch (error) {
        res.status(404).send(error);
    }
})

//delete the student by id
app.delete("/students/:id", async(req, res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        
        if (!req.params.id) {
        return res.status(400).send();
        }

        res.send(deleteStudent);

    }catch(err){
        res.status(500).send(err);
    }
    

})
app.listen(port, ()=>{
    console.log(`Connection is set up at ${port}`);
});