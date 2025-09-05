import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import './assets/variable.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <>
    <Toaster />
    <App />
  </>
)
