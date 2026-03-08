import React from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPet from "./pages/AddPet";
import ViewPets from "./pages/ViewPets";
import ViewPet from "./pages/ViewPet";
import EditPet from "./pages/EditPet";

// Inner component to access router location
function AppContent() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Hide navbar on login and register pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* HOME ROUTE */}
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/add-pet"
          element={token ? <AddPet /> : <Navigate to="/login" />}
        />
        <Route
          path="/pets"
          element={token ? <ViewPets /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={token ? <EditPet /> : <Navigate to="/login" />}
        />

        {/* PUBLIC PET VIEW (for pet sitter) */}
        <Route
          path="/pet/:id"
          element={<ViewPet />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;