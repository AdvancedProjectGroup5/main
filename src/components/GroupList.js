// GroupList.js
import React from 'react';

const GroupList = ({ groups }) => {
    return (
        <div className="group-list-container">
            <h2>Your Groups</h2>
            <ul className="group-list">
                {groups.length > 0 ? (
                    groups.map(group => (
                        <li key={group.id}>
                            <h3 className="group-name">{group.group_name}</h3>
                            <p className="group-description">{group.description}</p>
                        </li>
                    ))
                ) : (
                    <p>You are not part of any groups yet.</p>
                )}
            </ul>
        </div>
    );
};

export default GroupList;
