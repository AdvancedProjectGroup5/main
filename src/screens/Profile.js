import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, signOut, deleteAccount } = useAuth();
    const [userName, setUserName] = useState(user.userName);

    const clickDeleteAccount = () => {
        // Show confirmation dialog before deleting account
        if (window.confirm("Are you sure you want to delete your account?")) {
            deleteAccount();
        } else {
            return;
        }
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>{userName}</p>
            <button onClick={signOut}>Log out</button>
            <button onClick={clickDeleteAccount}>Delete account</button>
        </div>
    );
};

export default Profile;
