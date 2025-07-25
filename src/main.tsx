import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import './i18n/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/amino-acid-aligner">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
