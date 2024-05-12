import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Charts from './components/Charts.tsx'
import Navbar from './components/Navbar.tsx'
import Status from './components/status.tsx'

function App() {

  return (
    <>
        <Navbar/>
        <div className="divStyle">
          <Status />
          <Charts />
        </div>
    </>
  )
}

export default App
