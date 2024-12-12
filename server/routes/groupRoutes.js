import express from 'express';
import * as groupController from '../controllers/groupController.js';
import { validateGroupCreation } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Route to create a new group with validation
router.post('/', validateGroupCreation, groupController.createGroup);

// Route to get all groups for a specific user with pagination
router.get('/:userId', groupController.getUserGroups);

export default router;
