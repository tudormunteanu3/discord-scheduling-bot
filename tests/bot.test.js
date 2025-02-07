const request = require('supertest');
const app = require('../server');
const { disconnectDB } = require('../db')

describe('GET /', () => {
    it('should return "API is running"', async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual('API is running.')
    })
})

describe('POST /api/event', () => {
    it('should create an event if date is in the future and there are no duplicates', async () => {
        const newEvent = {
            title: "Event with correct date",
            description: "this event should be valid",
            eventDate: new Date(Date.now() + 360000).toISOString(),
        }
        const res = await request(app)
            .post('/api/event')
            .send(newEvent)
            .set('Accept', 'application/json')


        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('_id')
        expect(res.body.title).toEqual(newEvent.title)
        expect(res.body.eventDate).toEqual(newEvent.eventDate)
    })


    it('should not create a new event if the date is in the past', async () => {
        const pastDateEvent = {
            title: "Event with date in the past",
            description: "this event should not be valid",
            eventDate: new Date(Date.now() - 360000).toISOString(),
        }

        const res = await request(app)
            .post('/api/event')
            .send(pastDateEvent)
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe("Date has already passed, please pick an event in the future.")
    })

    it('should not create a new event if there is a duplicate event already', async () => {
        const duplicateEvent = {
            title: "Duplicate Event",
            description: "this event already exists and should not be valid",
            eventDate: new Date(Date.now() + 360000).toISOString(),
        }

        const firstEvent = await request(app)
            .post('/api/event')
            .send(duplicateEvent)
            .set('Accept', 'application/json')

        expect (firstEvent.statusCode).toEqual(201)
        expect (firstEvent.body).toHaveProperty('_id')
        expect (firstEvent.body.title).toEqual(duplicateEvent.title)
        expect (firstEvent.body.eventDate).toEqual(duplicateEvent.eventDate)

        const secondEvent = await request(app)
            .post('/api/event')
            .send(duplicateEvent)
            .set('Accept', 'application/json')
        expect(secondEvent.statusCode).toEqual(400)
        expect(secondEvent.body).toHaveProperty('error')
        expect(secondEvent.body.error).toBe("This event already exists.")
    })
})

afterAll(async () => {
    await disconnectDB();
})