// backend/routes/groupRoutes.js
import express from 'express';
import * as groupController from '../controllers/groupController.js';

const router = express.Router();

// Route to create a new group
router.post('/groups', groupController.createGroup);

// Route to get all groups for a specific user
router.get('/groups/:userId', groupController.getUserGroups);

export default router;

