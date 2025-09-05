import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './assets/variable.css'
import App from './App.jsx'
import StoreProvider from "./utilities/Context/StoreProvider";

createRoot(document.getElementById('root')).render(
  <>
    <StoreProvider>
      <Toaster />
      <App />
    </StoreProvider>
  </>
)
