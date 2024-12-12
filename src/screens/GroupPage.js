// GroupPage.js
import React, { useState, useEffect } from 'react';
import GroupForm from '../components/GroupForm';
import GroupList from '../components/GroupList';

const GroupPage = () => {
    const [groups, setGroups] = useState([]);
    const [userId, setUserId] = useState(1); // Get logged-in user id (for example)

    useEffect(() => {
        fetchUserGroups();
    }, [userId]);

    const fetchUserGroups = async () => {
        try {
            const response = await fetch(`/api/groups/${userId}`);
            const data = await response.json();
            setGroups(data); // Update the groups state with the fetched groups
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const handleGroupCreated = (newGroup) => {
        setGroups((prev) => [newGroup, ...prev]);
    };

    return (
        <div className="group-page">
            <h1 className="page-title">Group Management</h1>
            <GroupForm onGroupCreated={handleGroupCreated} userId={userId} />
            <GroupList groups={groups} />
        </div>
    );
};

export default GroupPage;
