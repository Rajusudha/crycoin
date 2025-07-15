// import React,{useState} from 'react'
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CoinPage from './pages/CoinPage';
import Compare from './pages/Compare';
import WatchListPage from './pages/WatchListPage';
import {createContext} from 'react'
import SignUp from './SignUp';
// import SignIn from "./pages/SignIn";
import LandingPage from "./components/HomePageComponents/LandingPage"
// import LandingPage from '../components/HomePageComponents/LandingPage'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


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
          <Route path='/signUp' element={[<SignUp/>]}/>
          <Route path='/landingPage' element={[<LandingPage/>]}/>
        </Routes>
      </Router>
      <ToastContainer />
      {/* <SignUp/> */}
      
     

    </div>
  );
}


export default App;