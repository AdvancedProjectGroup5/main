import { Router } from 'express';
import { auth } from '../middlewares/auth.js'
import { postFavorite, getFavorites, postSharedLink, getSharedFavorites } from '../controllers/favoriteController.js'

const router = Router();

router.post('/', auth, postFavorite);
router.get('/:userId', getFavorites);
router.post('/shared/:userId', postSharedLink);
router.get('/shared/:shareToken', getSharedFavorites);

export default router;