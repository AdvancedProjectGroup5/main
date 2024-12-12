import { body, validationResult } from 'express-validator';

// Middleware for validating group creation inputs
export const validateGroupCreation = [
    body('group_name').isString().notEmpty().withMessage('Group name is required'),
    body('description').isString().optional(),
    body('owner_id').isInt().withMessage('Owner ID must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
