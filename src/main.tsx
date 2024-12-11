import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Set Google Maps API key in localStorage
localStorage.setItem('GOOGLE_MAPS_API_KEY', 'AIzaSyCB04IGvQqN2J9SlFR0gg6Km7e09RHHFIM')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)