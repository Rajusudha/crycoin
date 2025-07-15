import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../function/firebase"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import Header from "./components/Header";
import Headers from '../components/common/Header/Headers'

// import LandingPage from '../components/HomePageComponents/LandingPage'
import { motion } from 'framer-motion';
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignin = async () => {
  if (!email || !password) {
    toast.error("Please fill in all fields.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Signed in successfully!");
    // navigate("/Header"); // ✅ redirect to dashboard
    navigate("/LandingPage");
  } catch (error) {
    toast.error(error.message);
  }
};

  

  return (
    
   <>
         <Headers />

          
    <div className="form"  >
     
      <h2 style={{textAlign:"center"}}>Sign In</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <motion.button onClick={handleSignin} style={{cursor:"pointer"}}   whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05, backgroundColor: "#9333ea" }}>Sign In</motion.button>
      <p style={{color:"#fff", textAlign:"center"}}>
        Don't have an account? <Link to="/signup" style={{color:"#fff"}}>Sign Up</Link>
      </p>
    </div>
   
   </>
  );
};

export default SignIn;
