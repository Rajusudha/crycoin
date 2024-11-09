import { useState } from "react";
import Drawer from "@mui/material/Drawer";  //sidebar
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";  //icon 

import { Switch } from "@mui/material"; //dark light switch
import React from 'react'
import './header.css'

function Sidebar() {
    const [open, setOpen] = useState(false);
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
  
  return (
    <div className="drawerDiv">
      <MenuRoundedIcon
        className="link"
        style={{fontSize: "1.5rem", margin: 0 }}
        onClick={() => setOpen(true)}
      />  
      {/* //icon */}
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <div className="drawer">
          <a href="/">
            <p className="link">Home</p>
          </a>
          <a href="/compare">
            <p className="link">Compare</p>
          </a>
          <a href="/watchlist">
            <p className="link">Watchlist</p>
          </a>
          <a href="/dashboard">
            <p className="link">Dashboard</p>
          </a>
           <Switch
            checked={!mode}
            onClick={(e) => {
              toggleTheme();
            }}
          /> 
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar