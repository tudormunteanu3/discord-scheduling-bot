// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const EventList = () => {
    const [events, setEvents] = useState([])


    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/event')
            setEvents(response.data)
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    }

    useEffect(() => {
        fetchEvents()
    })

    const deleteEvent = async id => {
        try {
            await axios.delete(`http://localhost:5000/api/event/${id}`)
            fetchEvents()
        } catch (error) {
            console.error('Unable to delete event', error)
        }
    }
    



    return (
        <div>
            <h1>Events</h1>
            <Link to="/create">
                <button>Create new event</button>
            </Link>
            {events.length === 0 ? (
                <p>No events available</p>
            ) : (
                <ul>
                    {events.map(event => (
                        <li key={event.id}>
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <p>
                                {new Date(event.eventDate).toLocaleString()}
                            </p>
                            { event.participants && event.participants.length >0 && (
                                <p>Participants: {event.participants.join(', ')}</p>
                            )}
                            <Link to={`/event/${event._id}`}>View and/or Edit</Link>
                            <button onClick={() => deleteEvent(event._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default EventList