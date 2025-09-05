import React from 'react';
import { useNavigate } from "react-router-dom";

const UnderDevelopment = () => {
    const navigate = useNavigate();
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
            <div className="text-center">
                <button
                    className="btn mt-4"
                    style={{ backgroundColor: "#15cb97", color: "white" }}
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
                <h1 className="display-4" style={{ color: "#15cb97" }}>Under Development</h1>
                <p className="lead" style={{ color: "#15daa2" }}>
                    We're working hard to bring you something amazing. Stay tuned!
                </p>
                <div
                    className="spinner-border"
                    role="status"
                    style={{ color: "#248d6f" }}
                >
                    <span className="visually-hidden"></span>
                </div>
            </div>
        </div>
    );
};

export default UnderDevelopment;
