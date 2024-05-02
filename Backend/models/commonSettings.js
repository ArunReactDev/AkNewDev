const mongoose = require('mongoose');


const featureSchema = new mongoose.Schema({
    feature : {
        type : String,
        required : true 
    }
})

// Define a sub-schema for the objects within the array
const objectSchema = new mongoose.Schema({
    // Define the properties of each object in the array
    plantitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    monthly: {
        type: String,
        required: true
    },
    buttonText: {
        type: String,
        required: true
    },
    buttonClass: {
        type: String,
        required: true
    },
    noOfMonths: {
        type: String,
        required: true
    },
    featureHeading : {
        type : String,
        required : true 
    },
    features : {
        type: [featureSchema], // Use the sub-schema defined above
        required: true
    }
});



const settingschema = new mongoose.Schema({
    trial_period: {
        type: Number,
        default: 7
    },
    plan_details: {
        type: [objectSchema], // Use the sub-schema defined above
        required: true
    }
});

module.exports = mongoose.model('commonSettings', settingschema);