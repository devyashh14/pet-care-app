import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewPet() {

    const { id } = useParams();

    const [pet, setPet] = useState(null);

    useEffect(() => {

        const apiUrl = `http://${window.location.hostname}:8000/api/pets/view/${id}`;

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
        <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "20px", display: "flex", justifyContent: "center", alignItems: "flex-start", fontFamily: "'Inter', sans-serif" }}>
            <div style={{
                width: "100%",
                maxWidth: "480px",
                background: "white",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                border: "1px solid #f1f5f9"
            }}>
                {/* Header Image */}
                <div style={{ position: "relative", height: "300px", width: "100%", backgroundColor: "#e2e8f0" }}>
                    <img
                        src={pet.image}
                        alt={pet.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)", height: "100px" }}></div>
                    <h1 style={{ position: "absolute", bottom: "15px", left: "25px", color: "white", margin: 0, fontSize: "32px", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                        {pet.name}
                    </h1>
                </div>

                <div style={{ padding: "25px" }}>
                    {/* Owner Info */}
                    {pet.user && pet.user.name && (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "25px", paddingBottom: "20px", borderBottom: "1px solid #f1f5f9" }}>
                            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#e0f2fe", display: "flex", justifyContent: "center", alignItems: "center", color: "#0284c7", fontWeight: "bold", fontSize: "16px" }}>
                                {pet.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600" }}>Care Instructions From</p>
                                <p style={{ margin: "2px 0 0 0", color: "#334155", fontWeight: "600", fontSize: "15px" }}>{pet.user.name}</p>
                            </div>
                        </div>
                    )}

                    {/* Quick Stats Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "25px" }}>
                        <div style={{ background: "#f8fafc", padding: "15px", borderRadius: "16px", border: "1px solid #f1f5f9" }}>
                            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Breed</p>
                            <p style={{ margin: "5px 0 0 0", color: "#0f172a", fontWeight: "600", fontSize: "15px" }}>{pet.breed || "N/A"}</p>
                        </div>
                        <div style={{ background: "#f8fafc", padding: "15px", borderRadius: "16px", border: "1px solid #f1f5f9" }}>
                            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Age</p>
                            <p style={{ margin: "5px 0 0 0", color: "#0f172a", fontWeight: "600", fontSize: "15px" }}>{pet.age || "N/A"} Years</p>
                        </div>
                    </div>

                    {/* Detailed Care Instructions */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                        {/* Diet Card */}
                        <div style={{ background: "#f0fdf4", padding: "20px", borderRadius: "16px", border: "1px solid #dcfce7" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                                <span style={{ fontSize: "18px" }}>🍲</span>
                                <h3 style={{ margin: 0, color: "#166534", fontSize: "15px", fontWeight: "700" }}>Diet & Feeding</h3>
                            </div>
                            <p style={{ margin: 0, color: "#15803d", fontSize: "14px", lineHeight: "1.6" }}>{pet.diet || "No specific diet provided."}</p>
                        </div>

                        {/* Medicine Card */}
                        <div style={{ background: "#fef2f2", padding: "20px", borderRadius: "16px", border: "1px solid #fee2e2" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                                <span style={{ fontSize: "18px" }}>💊</span>
                                <h3 style={{ margin: 0, color: "#991b1b", fontSize: "15px", fontWeight: "700" }}>Medication & Health</h3>
                            </div>
                            <p style={{ margin: 0, color: "#b91c1c", fontSize: "14px", lineHeight: "1.6" }}>{pet.medicine || "No medications required."}</p>
                        </div>

                        {/* Vet Card */}
                        <div style={{ background: "#eff6ff", padding: "20px", borderRadius: "16px", border: "1px solid #dbeafe", marginTop: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                                <span style={{ fontSize: "18px" }}>🏥</span>
                                <h3 style={{ margin: 0, color: "#1e40af", fontSize: "15px", fontWeight: "700" }}>Veterinary Contact</h3>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ color: "#60a5fa", fontSize: "14px", fontWeight: "600" }}>Clinic/Doctor</span>
                                    <span style={{ color: "#1d4ed8", fontSize: "14px", fontWeight: "600" }}>{pet.vetName || "N/A"}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ color: "#60a5fa", fontSize: "14px", fontWeight: "600" }}>Phone Number</span>
                                    <span style={{ color: "#1d4ed8", fontSize: "14px", fontWeight: "600" }}>{pet.vetContact || "N/A"}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default ViewPet;