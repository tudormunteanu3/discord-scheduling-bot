const mongoose  = require('mongoose') 

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Default event title'
    },
    description: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
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