import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (
    <div
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#333"
      }}
    >

      <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="CareMyPet Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          <h3 style={{ margin: 0, fontSize: '22px' }}>CareMyPet</h3>
        </div>
      </Link>

      <div>

        {!token && !location.pathname.startsWith('/pet/') && (
          <>
            <Link to="/login" style={{ color: "#333", marginRight: "20px", textDecoration: "none", fontWeight: "600" }}>
              Login
            </Link>

            <Link to="/register" style={{ color: "#333", textDecoration: "none", fontWeight: "600" }}>
              Register
            </Link>
          </>
        )}

        {token && !location.pathname.startsWith('/pet/') && (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {/* Removed Add Pet and My Pets links as requested */}

            {location.pathname !== "/" && (
              <button
                onClick={() => {
                  if (location.pathname.startsWith('/edit/')) {
                    navigate('/pets');
                  } else {
                    navigate('/');
                  }
                }}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid #333",
                  color: "#333",
                  padding: "6px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                {location.pathname.startsWith('/edit/') ? 'Back' : 'Back to Home'}
              </button>
            )}

            <button
              onClick={logout}
              style={{
                backgroundColor: "#e74c3c", /* Slightly nicer red */
                border: "none",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Logout
            </button>
          </div>
        )}

      </div>

    </div>

  );

}

export default Navbar;