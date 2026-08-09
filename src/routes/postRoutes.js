import { Router } from 'express';
import * as postController from '../controllers/postController.js';

const router = Router();

// GET /posts & POST /posts
router.get('/', postController.getPosts);
router.post('/', postController.createPost);

// GET /posts/:id & PUT /posts/:id & DELETE /posts/:id
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;