// eslint-disable-next-line no-unused-vars
import React from 'react'
import EventList from './components/EventList'
import EventForm from './components/EventForm'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return(
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/create" element={<EventForm />} />
        <Route path="/event/:id" element={<EventForm />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App