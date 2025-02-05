const express = require('express')
const router = express.Router();
const Event = require('../models/Event')

//to see all
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ eventDate: 1});
        req.json(events);
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
        const savedEvent = await newEvent.save()
        req.status(201).json(savedEvent)
    } catch (err) {
        res.status(500).json({error: err.message })
    }
})

//to update one
router.put('/:id', async (res, req) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true})
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found.'})
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
        res.json ({ message: `Event ${deletedEvent} deleted.`})
    } catch(err) {
        res.status(500).json({ error: err.message})
    }
})

module.exports  = router;