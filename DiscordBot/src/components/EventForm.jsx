// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EventForm = () => {
    const [title,setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if(id) {
            axios
                .get(`http://localhost:5000/api/event/${id}`)
                .then(res => {
                    setTitle(res.data.title)
                    setDescription(res.data.description)
                    const formattedDate =  new Date(res.data.eventDate)
                        .toISOString()
                        .slice(0,16)
                    setEventDate(formattedDate)
                })
                .catch(error => console.error('error fetching event form API:', error))
        }
    }, [id])

    const submitHandler = async e => {
        e.preventDefault()

        if (new Date(eventDate)< new Date()) {
            setErrorMessage("Date is in the past, please pick a date in the future.")
            return;
        }

        setErrorMessage('')

        const eventData = {title, description, eventDate}

        try{
            if(id) {
                await axios.put(`http://localhost:5000/api/event/${id}`, eventData)
            } else {
                await axios.post(`http://localhost:5000/api/event`, eventData)
            }

            navigate('/')
        } catch (error) {
            console.error('Error adding/updating event:', error)
            if (error.response?.data?.error) {
                setErrorMessage(error.response.data.error)
            } else {
                setErrorMessage("Error saving event.")
            }

        }
    }

    return (
        <div>
            <h1>
                {id ? 'Edit Event' : 'Create Event'}
            </h1>
            {errorMessage && (
                <div style={{ color: 'red', marginBottom: '1rem'}}>
                    {errorMessage}
                </div>
            )}
            <form onSubmit={submitHandler}>
                <div>
                    <label>Title:</label>
                    <br />
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />    
                </div>
                <div>
                    <label>Description:</label>
                    <br />
                    <input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />    
                </div>
                <div>
                    <label>Date and Time:</label>
                    <br />
                    <input
                        type="datetime-local"
                        value={eventDate}
                        onChange={e => setEventDate(e.target.value)}
                        required
                    />    
                </div>
                <button type="submit">{id ? 'Update' : 'Create'} Event</button>
            </form>
        </div>
    )
}

export default EventForm;