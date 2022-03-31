const express = require('express');
const app = express();
const port = 8011;
app.use(express.json());
const mongoose = require("mongoose");
const Student = require("./models/studentModel")
const Adress = require("./models/adressModel")
require('dotenv').config({ path: "./.env"})


mongoose
	.connect(
		process.env.MONGO_URI,
		{
			useNewUrlParser: true,
		}
	)
	.then(() => console.log("Connected to MongoDB"));


// Middleware activated by every request
function debug( req, res, next){
    console.log("requête reçue");
    next()
}

// GET - Display the list of Student
app.get ("/student", debug, async (req,res)=> {
	try { 
		let student= await Student.find();
		res.json(student);
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			message: "An error happened",
		});
	}


 })

 app.get("/student/:Id", async (req, res) => {
	 const student = await Student.findById(req.params.Id).populate("adress");
	 
	 res.json(student);
	});
	
	// Create Adress then Student
	
app.post("/student", async (req, res) => {
	let adressId ;
	try{
		adressStudent = await Adress.create(req.body.adress);
		req.body.student.adress = adressStudent.id;

	}
	catch(err){
		console.log(err)
		return res.send("error")
	};
	try{
		 await Student.create(req.body.student);
		
	}catch(err){
		console.log(err)
		return res.send("error")
	}
	res.status(201).send("user created");
});

// app.get("/student/:studentId", debug, (req, res)=>{
// 	const student = Student.findById(req.body.studentId).populate("adress");
// 	res.json(student)
// })


app.get("*", (req, res) => {
    res.status(404).send("Did not found the info");
  });

 app.listen(port, () => {
    console.log('Server started on port: ' + port);
  });