// GroupForm.js
import React, { useState } from 'react';

const GroupForm = ({ onGroupCreated, userId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newGroup = { name, description, owner_id: userId };
            const response = await fetch('/api/groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGroup),
            });
            const data = await response.json();
            onGroupCreated(data); // Pass the new group to the parent component
            setName('');
            setDescription('');
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="group-form">
            <input
                type="text"
                placeholder="Group Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
            />
            <textarea
                placeholder="Group Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field"
            />
            <button type="submit" className="submit-btn">Create Group</button>
        </form>
    );
};

export default GroupForm;
