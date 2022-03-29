const mongoose = require("mongoose");


const adressSchema = new mongoose.Schema({
    streetName: {
        type: String,
        
    },
    streetNumber: {
        type: String,
    },
    postCode: {
        type: String,
    },
    city: {
        type: String,
    },
})

const Adress = mongoose.model("Adress", adressSchema);

// exporter le modèle
module.exports = Adress;