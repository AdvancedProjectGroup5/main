import { pool } from '../helper/db.js';
import { ApiError } from '../helper/apiError.js';
import { emptyOrRows } from '../helper/utils.js';

const createGroup = async (req, res, next) => {
    const { name, description } = req.body;
    const ownerId = req.decodedUser.id;

    try {
        const result = await pool.query(
            `INSERT INTO groups (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *`,
            [name, description, ownerId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(new ApiError(err.message, 400));
    }
};

const getGroups = async (req, res, next) => {
    try {
        const result = await pool.query(`SELECT * FROM groups`);
        res.status(200).json(emptyOrRows(result));
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

const getGroupById = async (req, res, next) => {
    const { groupId } = req.params;

    try {
        const result = await pool.query(`SELECT * FROM groups WHERE id = $1`, [groupId]);
        if (result.rows.length === 0) {
            return next(new ApiError('Group not found', 404));
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

const deleteGroup = async (req, res, next) => {
    const { groupId } = req.params;
    const ownerId = req.decodedUser.id;

    try {
        const result = await pool.query(
            `DELETE FROM groups WHERE id = $1 AND owner_id = $2 RETURNING *`,
            [groupId, ownerId]
        );
        if (result.rows.length === 0) {
            return next(new ApiError('Group not found or not authorized', 404));
        }
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

const addMemberToGroup = async (req, res, next) => {
    const { groupId } = req.params;
    const { userId } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO user_groups (group_id, user_id, status) VALUES ($1, $2, 'approved') RETURNING *`,
            [groupId, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(new ApiError(err.message, 400));
    }
};

const removeMemberFromGroup = async (req, res, next) => {
    const { groupId, userId } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM user_groups WHERE group_id = $1 AND user_id = $2 RETURNING *`,
            [groupId, userId]
        );
        if (result.rows.length === 0) {
            return next(new ApiError('Member not found in the group', 404));
        }
        res.status(200).json({ message: 'Member removed successfully' });
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

const addCustomContent = async (req, res, next) => {
    const { groupId } = req.params;
    const { contentType, contentId } = req.body;
    const addedBy = req.decodedUser.id;

    try {
        const result = await pool.query(
            `INSERT INTO group_custom_content (group_id, content_type, content_id, added_by) VALUES ($1, $2, $3, $4) RETURNING *`,
            [groupId, contentType, contentId, addedBy]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(new ApiError(err.message, 400));
    }
};

export {
    createGroup,
    getGroups,
    getGroupById,
    deleteGroup,
    addMemberToGroup,
    removeMemberFromGroup,
    addCustomContent,
};
