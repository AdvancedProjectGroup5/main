import { pool } from '../helper/db.js';

// Function to create a new group
export const createGroup = async (group_name, description, owner_id) => {
    try {
        const result = await pool.query(
            'INSERT INTO groups (group_name, description, owner_id) VALUES ($1, $2, $3) RETURNING *',
            [group_name, description, owner_id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Error creating group: ' + error.message);
    }
};

// Function to get groups for a specific user with optional pagination
export const getUserGroups = async (userId, limit = 10, offset = 0) => {
    try {
        const result = await pool.query(
            `SELECT g.id, g.group_name, g.description
             FROM groups g
             INNER JOIN user_groups ug ON g.id = ug.group_id
             WHERE ug.user_id = $1
             LIMIT $2 OFFSET $3`,
            [userId, limit, offset]
        );
        return result.rows;
    } catch (error) {
        throw new Error('Error fetching groups: ' + error.message);
    }
};
