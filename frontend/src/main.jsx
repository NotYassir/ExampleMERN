import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ExamplesContextProvider from './context/ExamplesContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ExamplesContextProvider>
        <App />
      </ExamplesContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
