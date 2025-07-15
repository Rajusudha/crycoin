import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./function/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import Header from "./components/Header";
import { motion } from 'framer-motion';
import Footer from "./components/common/Footer/Footer";
import Headers from "./components/common/Header/Headers";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      setDisplayName(name);
      toast.success("Account created successfully!");
      navigate("/"); // redirect to home or dashboard
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please sign in.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters.");
      } else {
        toast.error("Signup failed. Please try again.");
        console.error(error); // for debugging
      }
    }
  };

  return (
    <>
    <Headers/>
    <div className="form">
      <h2 style={{textAlign:"center"}}>SignUp.</h2>

      <input
        type="text"
        placeholder="Full Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="email"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <motion.button onClick={handleSignup} style={{cursor:"pointer"}}  whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05, backgroundColor: "#9333ea" }}>Sign Up</motion.button>
       <p style={{color:"#fff", textAlign:"center"}} >
        Already have an account? <Link to="/signin" style={{color:"#fff"}}>Sign In</Link>
      </p>

      {displayName && (
        <p style={{ marginTop: "1rem", color: "green" }} >
          👋 Welcome, <strong>{displayName}</strong>!
        </p>
      )}
       
    </div>
   
    </>
  );
};

export default SignUp;
