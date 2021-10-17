const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jsSchema = new Schema({
    jobSeekerId: {
        type: String,
        required: true
    },
    jobPreference: [{
        type:String,
    }],
    savedJobs: [{
        type:String,
    }]
});

const JobSeeker = mongoose.model('JobSeeker',jsSchema);
module.exports = JobSeeker;