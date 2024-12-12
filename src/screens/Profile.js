import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, signOut, deleteAccount } = useAuth();
    const [userName] = useState(user.userName);
    const navigate = useNavigate();

    const clickDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            deleteAccount();
        }
    };

    const navigateToFavourites = () => {
        navigate("/favourites");
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Profile</h1>
            <div style={styles.profileCard}>
                <p style={styles.userName}>Welcome, {userName}!</p>
                <div style={styles.buttonGroup}>
                    <button style={styles.button} onClick={signOut}>Log out</button>
                    <button style={styles.button} onClick={clickDeleteAccount}>Delete account</button>
                    <button style={styles.button} onClick={navigateToFavourites}>View Favourites</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        height: "100vh",
    },
    heading: {
        color: "#333",
        fontSize: "2em",
        marginBottom: "20px",
    },
    profileCard: {
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "300px",
    },
    userName: {
        fontSize: "1.2em",
        color: "#555",
        marginBottom: "20px",
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    button: {
        padding: "10px",
        fontSize: "1em",
        color: "#fff",
        backgroundColor: "#007BFF",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default Profile;
