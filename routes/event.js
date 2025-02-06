const express = require('express')
const router = express.Router();
const Event = require('../models/events.js')

//to see all
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ eventDate: 1});
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

//to see one
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({error:'Event not found.'})
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//to create one
router.post('/', async (req, res) => {
    try {
        const { title, description, eventDate} = req.body
        const newEvent = new Event({ title, description, eventDate})

        const dateChecker = new Date(eventDate);

        if(dateChecker < new Date()) {
            return res.status(400).json({ error: "Date has already passed, please pick an event in the future."})
        }

        const duplicate = await Event.findOne({title, eventDate: dateChecker})
        if(duplicate) {
            return res.status(400).json({ error: "This event already exists."})
        }


        const savedEvent = await newEvent.save()
        res.status(201).json(savedEvent)
    } catch (err) {
        res.status(500).json({error: err.message })
    }
})

//to update one
router.put('/:id', async (req, res) => {
    try {
        if (req.body.eventDate) {
            const dateChecker = new Date(req.body.eventDate)
            if (dateChecker < new Date()) {
                return res.status(400).json({error: "Date cannot be in the past, please pick a date in the future"})
            }
        }


        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true})
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found.'})
        }

        const titleDuplicateChecker = req.body.title
        const dateDuplicateChecker = req.body.eventDate
        
        const duplicate = await Event.findOne({
            title: titleDuplicateChecker,
            eventDate: dateDuplicateChecker,
            _id: { $ne: req.params.id}
        })

        if (duplicate) {
            return res.status(400).json({ error: "The event already exists"})
        }
        res.json(updatedEvent);
    } catch(err) {
        res.status(500).json({ error: err.message})
    }
})

//to delete one

router.delete('/:id', async (req,res) => {
    try{
        const deletedEvent = await Event.findByIdAndDelete(req.params.id)
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found.' })
        }
        res.json ({ message: `Event ${deletedEvent.title} deleted.`})
    } catch(err) {
        res.status(500).json({ error: err.message})
    }
})

module.exports  = router;