const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    surName: {
        type: String,
        required: true,
    },
   adress: [
       { type: mongoose.Types.ObjectId, ref: "Adress" }
    ],
   
    
})

const Student = mongoose.model("Student", studentSchema);

// exporter le modèle
module.exports = Student;