import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddPet.css"; // Import the specific styles

function AddPet() {
  const navigate = useNavigate();

  const [pet, setPet] = useState({
    name: "",
    breed: "",
    age: "",
    diet: "",
    medicine: "",
    vetName: "",
    vetContact: "",
    image: ""
  });

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(
      "https://petcare-backend-7hnc.onrender.com/api/pets/add",
      pet,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    )
      .then(() => {
        alert("Pet Added!");
        navigate("/pets");
      })
      .catch(err => {
        console.log(err);
        alert("Error adding pet");
      });
  };

  return (
    <div className="add-pet-page-wrapper">

      {/* LEFT SIDE: The Form */}
      <div className="left-panel">
        <h1>Add Your Little Friend</h1>

        <div className="add-pet-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-wrapper">
                <span className="emoji-icon">🐾</span>
                <input className="form-input" name="name" placeholder="Pet Name" onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="emoji-icon">🐕</span>
                <input className="form-input" name="breed" placeholder="Breed (e.g., Golden Retriever)" onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="emoji-icon">🎂</span>
                <input className="form-input" name="age" placeholder="Age" onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="emoji-icon">🥩</span>
                <input className="form-input" name="diet" placeholder="Diet Instructions" onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="emoji-icon">💊</span>
                <input className="form-input" name="medicine" placeholder="Medicine / Health Notes" onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="emoji-icon">👨‍⚕️</span>
                <input className="form-input" name="vetName" placeholder="Vet's Name" onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="emoji-icon">📞</span>
                <input className="form-input" name="vetContact" placeholder="Vet's Contact Number" onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="emoji-icon">📸</span>
                <input className="form-input" name="image" placeholder="Pet Image URL" onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="btn-submit-pet">Add Pet</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPet;