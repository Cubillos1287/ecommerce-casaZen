import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Ensure access to global styles

const NotFoundPage = () => {
    return (
        <div
            style={{
                minHeight: "calc(100vh - 80px)", // similar to other pages
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#fdfdfd",
            }}
        >
            <div
                style={{
                    maxWidth: "600px",
                    width: "100%",
                    padding: "40px",
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    alignItems: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "120px",
                        fontWeight: "900",
                        margin: 0,
                        color: "var(--cz-primary)",
                        lineHeight: "1",
                    }}
                >
                    404
                </h1>
                <h2 style={{ fontSize: "28px", fontWeight: "700", margin: 0 }}>
                    ¡Ups! Página no encontrada
                </h2>
                <p style={{ color: "#666", fontSize: "16px", margin: 0 }}>
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>

                <Link
                    to="/"
                    className="btn-primary"
                    style={{
                        padding: "12px 32px",
                        fontSize: "18px",
                        marginTop: "10px",
                        display: "inline-block",
                        width: "auto",
                    }}
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
