const mongoose  = require('mongoose') 

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    eventDate: {
        type: Date,
    },
    participants: [
        {
            type: String,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Event', EventSchema)