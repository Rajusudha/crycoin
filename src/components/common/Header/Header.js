import React, { useState } from 'react'
import './header.css'
import {Link} from 'react-router-dom'
import Sidebar from '../../common/Header/Sidebar'   //drawer mui component
import Button from '../../common/Button/Button'

// import { ThemeContext } from '@emotion/react'

import { Switch } from "@mui/material";
import { auth } from '../../../function/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Header() {


  // switch  start

  // set theme==dark,light to local storage
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };


  // every time need to toggle switch light to dark  to solve get theme from local storage 
  const storedTheme = localStorage.getItem("theme");

  // const prefersDark =
  //   window.matchMedia &&
  //   window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
   storedTheme === "dark" || (storedTheme === null );

  if (defaultDark) {
   setDark();
   }

  const [mode, setMode] = useState(defaultDark ? true : false);

  const toggleTheme = (e) => {
    if (!mode) {
      setDark();
    } else {
      setLight();
    }
    setMode(!mode);
  };
 

  // switch end
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      alert('Logout failed: ' + error.message);
    }
  };

  return (
   
    <div className="navbar">
    
      {/* nav bar  home,comapre, whishlist ,dashbord(right side) */}
        <h1 className="heading" style={{color:"var(--green) "}}>
        <Link to="/">
          CryptoTracker<span style={{color: "var(--blue)" }}>.</span>
        </Link>
      </h1>
   
      <div className="links">
        {/* switch buttn mui api */}
      <Switch
          checked={!mode}
          onClick={(e) => {
            toggleTheme();
          }}
        />
        {/* switch end */}
    <Link to="/">
          <p className="link">Home</p>
        </Link>
        <Link to="/compare">
          <p className="link">Compare</p>
        </Link>
        <Link to="/watchlist">
          <p className="link">Watchlist</p>
        </Link>
        <Link to="/dashboard">
          <Button text="dashboard" />
        </Link>
        <button className="link" style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--grey)', fontWeight: 600, fontSize: '0.8rem'}} onClick={handleLogout}>Logout</button>
       </div>

       {/* nav bar end */}
       <Sidebar />
       {/* sidebar for phone component */}
    </div>
  )
}

export default Header