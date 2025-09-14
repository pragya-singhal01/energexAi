import express from 'express';
import { getAllPosts, getPostById} from '../controllers/postController.ts';
import { verifyToken } from '../middlewares/authMiddleware.ts';

const router = express.Router();

router.get('/', verifyToken, getAllPosts);
// router.get('/my-posts', verifyToken, getUserPosts);
router.get('/:id', verifyToken, getPostById);
// router.post('/', verifyToken, createPost);

export default router;