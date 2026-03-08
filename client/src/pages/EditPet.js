import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPet() {

  const { id } = useParams();
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

  const token = localStorage.getItem("token");

  useEffect(() => {

    axios.get(
      `http://localhost:8000/api/pets/${id}`,
      {
        headers: {
          Authorization: token
        }
      }
    )
      .then(res => {
        setPet(res.data);
      })
      .catch(err => console.log(err));

  }, [id, token]);



  const handleChange = (e) => {
    setPet({
      ...pet,
      [e.target.name]: e.target.value
    });
  };



  const handleSubmit = (e) => {

    e.preventDefault();

    axios.put(
      `http://localhost:8000/api/pets/update/${id}`,
      pet,
      {
        headers: {
          Authorization: token
        }
      }
    )
      .then(() => {

        alert("Pet updated successfully!");

        navigate("/pets");

      })
      .catch(err => {

        console.log(err);

        alert("Error updating pet");

      });

  };



  return (

    <div style={{ padding: "40px" }}>

      <h2>Edit Pet</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          value={pet.name}
          onChange={handleChange}
          placeholder="Pet Name"
        />
        <br /><br />

        <input
          name="breed"
          value={pet.breed}
          onChange={handleChange}
          placeholder="Breed"
        />
        <br /><br />

        <input
          name="age"
          value={pet.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <br /><br />

        <input
          name="diet"
          value={pet.diet}
          onChange={handleChange}
          placeholder="Diet"
        />
        <br /><br />

        <input
          name="medicine"
          value={pet.medicine}
          onChange={handleChange}
          placeholder="Medicine"
        />
        <br /><br />

        <input
          name="vetName"
          value={pet.vetName}
          onChange={handleChange}
          placeholder="Vet Name"
        />
        <br /><br />

        <input
          name="vetContact"
          value={pet.vetContact}
          onChange={handleChange}
          placeholder="Vet Contact"
        />
        <br /><br />

        <input
          name="image"
          value={pet.image}
          onChange={handleChange}
          placeholder="Pet Image URL"
        />
        <br /><br />

        <button type="submit">
          Update Pet
        </button>

      </form>

    </div>

  );

}

export default EditPet;