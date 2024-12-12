import React, { useState, useEffect, useCallback } from 'react';
import GroupForm from '../components/GroupForm';
import GroupList from '../components/GroupList';

const GroupPage = () => {
    const [groups, setGroups] = useState([]);
    const [userId, setUserId] = useState(1); // Get logged-in user id (for example)

    const fetchUserGroups = useCallback(async () => {
        try {
            const response = await fetch(`/api/groups/${userId}`);
            const data = await response.json();
            setGroups(data); // Update the groups state with the fetched groups
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    }, [userId]);  // Only recreate this function when userId changes

    useEffect(() => {
        fetchUserGroups();
    }, [userId, fetchUserGroups]); // Dependencies of useEffect

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
