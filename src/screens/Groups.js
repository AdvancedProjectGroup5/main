import React, { useState } from "react";
import axios from "axios";
import './Groups.css';

const Groups = () => {
    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState('');
    const userId = 1; // Replace with actual logged-in user ID (e.g., fetched from context or props)

    // Handle group creation
    const handleCreateGroup = async () => {
        const description = prompt("Enter a description for the group:");
        const header = { headers: { Authorization: "Bearer " + localStorage.getItem("token")}};
        if (!groupName || !description) {
            alert("Group name and description are required!");
            return;
        }
        try {
            const response = await axios.post('/groups', {
                name: groupName,
                owner_id: userId,
                description,
            }, header);
            alert(`Group created: ${response.data.name}`);
            setGroupName(''); // Reset input
        } catch (error) {
            console.error(error);
            alert('Error creating group.');
        }
    };

    // Handle joining a group
    const handleJoinGroup = async () => {
        if (!groupId) {
            alert("Group ID is required to join a group!");
            return;
        }
        try {
            const response = await axios.post('/groups/join', {
                user_id: userId,
                group_id: groupId,
            });
            alert('Successfully joined group!');
            setGroupId(''); // Reset input
        } catch (error) {
            console.error(error);
            alert('Error joining group.');
        }
    };

    return (
        <div className="group-page">
            <header className="group-header">
                <h1>🎥 Welcome to Group Pages</h1>
                <p>A collaborative space for movie enthusiasts</p>
            </header>
            

            <div className="group-content">
                {/* Group Actions Section */}
                <div className="section action-section">
                    <h2>Group Actions</h2>
                    <div className="input-fields">
                        <input
                            type="text"
                            placeholder="Enter group name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="group-input"
                        />
                        <input
                            type="text"
                            placeholder="Enter group ID to join"
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                            className="group-input"
                        />
                    </div>
                    <div className="button-group">
                        <button className="action-btn create-btn" onClick={handleCreateGroup}>
                            + Create Group
                        </button>
                        <button className="action-btn join-btn" onClick={handleJoinGroup}>
                            🔑 Join Group
                        </button>
                    </div>
                </div>
                

                {/* Recent Posts Section */}
                <div className="section">
                    <h2>Recent Posts</h2>
                    <div className="post">
                        <h3>🎬 Cinéma des lumières</h3>
                        <p>Join us this Friday for *Mad Max: Fury Road!*</p>
                        <span className="tag event-tag">Event</span>
                    </div>
                    <div className="post">
                        <h3>📝 Prosper Playoust</h3>
                        <p>Let's share our top 5 movies of all time!</p>
                        <span className="tag discussion-tag">Discussion</span>
                    </div>
                </div>

                {/* Featured Movies Section */}
                <div className="section">
                    <h2>Featured Movies</h2>
                    <div className="movie">
                        <img src="action-movie-poster.jpg" alt="Action Movie Poster" className="movie-poster" />
                        <h3>🎞️ Now Showing: Action Packed</h3>
                        <p>Action | Adventure</p>
                    </div>
                    <div className="movie">
                        <img src="comedy-movie-poster.jpg" alt="Comedy Movie Poster" className="movie-poster" />
                        <h3>😂 Upcoming: Laugh Out Loud</h3>
                        <p>Comedy | Family</p>
                    </div>
                </div>

                {/* Group Members Section */}
                <div className="section">
                    <h2>Group Members</h2>
                    <div className="member">
                        <h3>Emily</h3>
                        <p>Movie Enthusiast</p>
                    </div>
                    <div className="member">
                        <h3>Sam</h3>
                        <p>Film Critic</p>
                    </div>
                    <div className="admin-section">
                        <h3>Admin: Movie Buff</h3>
                        <p>Passionate about all things cinema</p>
                        <button>Message Admin</button>
                    </div>
                </div>
            </div>

            <footer className="group-footer">
                <p>📞 Contact Us | 🔒 Privacy Policy | 📜 Terms & Conditions</p>
                <p>&copy; 2024 CineCraic</p>
            </footer>
        </div>
    );
};

export default Groups;
