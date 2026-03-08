import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the specific home page styles

function Home() {

  return (
    <section className="hero-container">
      <div className="hero-text">
        <h1 className="hero-title">
          Welcome to <span>CareMyPet</span>
        </h1>
        <p className="hero-subtitle">
          The smartest, easiest way to keep your pet's care instructions safe and shareable. Give your pet sitters peace of mind with a beautiful, organized dashboard.
        </p>
        <div className="hero-actions">
          <Link to="/add-pet" className="btn-hero-primary">
            Add New Pet
          </Link>
          <Link to="/pets" className="btn-hero-secondary">
            View My Pets
          </Link>
        </div>
      </div>

      <div className="hero-image-wrapper">
        <img src="/home-hero-pets.png" alt="Happy dog and cat playing together" />
      </div>
    </section>
  )

}

export default Home;