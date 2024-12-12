// backend/controllers/groupController.js
import * as groupModel from '../models/groupModel.js';

// Controller to handle creating a group
export const createGroup = async (req, res) => {
    const { group_name, description, owner_id } = req.body;
    try {
        const newGroup = await groupModel.createGroup(group_name, description, owner_id);
        res.status(201).json(newGroup);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Controller to handle fetching groups for a user
export const getUserGroups = async (req, res) => {
    const userId = req.params.userId;
    try {
        const groups = await groupModel.getUserGroups(userId);
        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
