import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // <--- Make sure you import App, NOT Home
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />  {/* <--- This MUST be <App />, not <Home /> */}
  </React.StrictMode>,
)                        