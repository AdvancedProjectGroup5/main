import express from 'express';
import {auth} from '../middlewares/auth.js';
import {
    createGroup,
    getGroups,
    getGroupById,
    deleteGroup,
    addMemberToGroup,
    removeMemberFromGroup,
    addCustomContent,
} from '../controllers/groupController.js';

const router = express.Router();

router.post('/', auth, createGroup);

router.post('/:groupId/members', auth, addMemberToGroup);

router.post('/:groupId/custom-content', auth, addCustomContent);

router.get('/', getGroups);

router.get('/:groupId', auth, getGroupById);

router.delete('/:groupId', auth, deleteGroup);

router.delete('/:groupId/members/:userId', auth, removeMemberFromGroup);

export default router;
