import { Router } from 'express';
import { auth } from '../middlewares/auth.js'
import { postFavorite, getFavorites, getSharedLink } from '../controllers/favoriteController.js'

const router = Router();

router.post('/', auth, postFavorite);
router.get('/:userId', getFavorites);
router.get('/shared/:userId', auth, getSharedLink);

export default router;