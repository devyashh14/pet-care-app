import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewPet() {

    const { id } = useParams();

    const [pet, setPet] = useState(null);

    useEffect(() => {

        const apiUrl = `http://localhost:8000/api/pets/view/${id}`;

        axios
            .get(apiUrl)
            .then((res) => {
                setPet(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [id]);

    if (!pet) {
        return <h2>Loading...</h2>;
    }

    return (

        <div style={{ padding: "40px" }}>

            <h1>{pet.name}</h1>

            <img
                src={pet.image}
                alt={pet.name}
                style={{ width: "300px", borderRadius: "10px", marginBottom: "15px" }}
            />

            {pet.user && pet.user.name && (
                <p style={{
                    fontSize: "1.1rem",
                    color: "#6a7385",
                    fontStyle: "italic",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "15px",
                    marginBottom: "20px"
                }}>
                    A beloved pet of <b>{pet.user.name}</b>
                </p>
            )}

            <p><b>Breed:</b> {pet.breed}</p>

            <p><b>Age:</b> {pet.age}</p>

            <p><b>Diet:</b> {pet.diet}</p>

            <p><b>Medicine:</b> {pet.medicine}</p>

            <p><b>Vet:</b> {pet.vetName}</p>

            <p><b>Vet Contact:</b> {pet.vetContact}</p>

        </div>

    );

}

export default ViewPet;