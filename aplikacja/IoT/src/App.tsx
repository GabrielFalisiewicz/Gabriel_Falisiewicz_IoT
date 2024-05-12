import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Divider from '@mui/material/Divider';
import './App.css'
import Charts from './components/Charts.tsx'
import Navbar from './components/Navbar.tsx'
import Status from './components/status.tsx'
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const statusArray = Array(6).fill(null).map((_, index) => <Status key={index} Show={true} />);

const limit = 5;

function App() {

  return (
    <>
        <Navbar/>
        <div className="divStyle">
          <Status Show={false}/>
          <Charts/>
        </div>
        <br/><br/>
        <Divider sx={{backgroundColor: '#fff', paddingBottom: '6px', marginBottom: '10px' }} />
        <div className='statusArrayStyle'>
          {statusArray.map((_, index) => {
              if(index < limit){
                return <Status key={index} Show={true}/>;
              }
          })}
        </div>
        
    </>
  )
}

export default App
