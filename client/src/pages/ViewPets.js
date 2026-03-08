import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

function ViewPets() {

  const [pets, setPets] = useState([]);
  const [qrModalPet, setQrModalPet] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {

    axios.get(`http://${window.location.hostname}:8000/api/pets/all`, {
      headers: {
        Authorization: token
      }
    })
      .then(res => {
        setPets(res.data);
      })
      .catch(err => console.log(err));

  }, [token]);



  const getShareLink = (id) => {
    // Dynamically get the IP or hostname of the machine serving the app
    const hostname = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${window.location.protocol}//${hostname}${port}/pet/${id}`;
  };

  const copyLink = (id) => {

    const link = getShareLink(id);

    navigator.clipboard.writeText(link);

    alert("Care instructions link copied!");

  };



  const deletePet = (id) => {

    if (!window.confirm("Are you sure you want to delete this pet?")) return;

    axios.delete(
      `http://${window.location.hostname}:8000/api/pets/delete/${id}`,
      {
        headers: {
          Authorization: token
        }
      }
    )
      .then(() => {

        setPets(pets.filter(pet => pet._id !== id));

        alert("Pet deleted successfully");

      })
      .catch(err => console.log(err));

  };



  return (
    <div className="container" style={{ paddingTop: '120px' }}>

      <div className="page-header">
        <h2>My Pets</h2>
        <div className="pet-count-badge">
          {pets.length} {pets.length === 1 ? 'Pet' : 'Pets'} Owned
        </div>
      </div>

      {pets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#6a7385', marginBottom: '20px' }}>You haven't added any pets yet!</h3>
          <Link to="/add-pet">
            <button className="primary-btn" style={{ width: 'auto', padding: '12px 24px' }}>Add Your First Pet</button>
          </Link>
        </div>
      ) : (
        <div className="pet-grid">

          {pets.map((pet) => (

            <div className="pet-card" key={pet._id}>

              {pet.image && (
                <img
                  src={pet.image}
                  alt={pet.name}
                />
              )}

              <h3>{pet.name}</h3>

              <p><b>Breed:</b> {pet.breed}</p>

              <p><b>Age:</b> {pet.age}</p>

              <p><b>Diet:</b> {pet.diet}</p>

              <p><b>Medicine:</b> {pet.medicine}</p>

              <p><b>Vet:</b> {pet.vetName}</p>

              <p><b>Contact:</b> {pet.vetContact}</p>

              <div className="pet-card-actions">
                <button
                  className="primary-btn"
                  onClick={() => copyLink(pet._id)}
                >
                  Share Care Link
                </button>

                <button
                  className="primary-btn"
                  onClick={() => setQrModalPet(pet)}
                  style={{ backgroundColor: '#2c3e50', marginTop: '0' }}
                >
                  Show QR Code
                </button>

                <Link to={`/edit/${pet._id}`} style={{ flex: 1, display: 'flex' }}>
                  <button className="edit-btn" style={{ width: '100%' }}>
                    Edit
                  </button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => deletePet(pet._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Code Modal */}
      {qrModalPet && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            maxWidth: "90%",
            width: "400px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
          }}>
            <h3 style={{ marginTop: 0, color: "#2c3e50", fontSize: "1.5rem", marginBottom: "20px" }}>Scan to view {qrModalPet.name}</h3>

            <div style={{ padding: "15px", background: "white", display: "inline-block", borderRadius: "10px", border: "1px solid #eee", marginBottom: "20px" }}>
              <QRCodeSVG
                value={getShareLink(qrModalPet._id)}
                size={220}
                level="H"
                includeMargin={true}
              />
            </div>

            <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "25px", wordBreak: "break-all" }}>
              {getShareLink(qrModalPet._id)}
            </p>

            <button
              className="primary-btn"
              onClick={() => setQrModalPet(null)}
              style={{ width: "100%", margin: 0, padding: "12px", fontSize: "1rem" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ViewPets;