// import React,{useState} from 'react'
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CoinPage from './pages/CoinPage';
import Compare from './pages/Compare';
import WatchListPage from './pages/WatchListPage';
import {createContext} from 'react'

export const themeContext=createContext(null)
function App() {
  
  return (
    <div >

      <Router>
        <Routes>
          <Route path='/' element={[<Home id="light" />]} />
          <Route path='/dashboard' element={[<Dashboard />]}/>
          <Route path='/coin/:id' element={[<CoinPage />]}/>
          <Route path='/compare' element={[<Compare />]}/>
          <Route path='/watchList' element={[<WatchListPage/>]}/>
        </Routes>
      </Router>
     

    </div>
  );
}


export default App;