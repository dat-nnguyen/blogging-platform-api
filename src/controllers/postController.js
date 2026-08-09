import * as postService from '../services/postService.js';
import { validatePostInput } from '../utils/validator.js';

/**
 * GET /api/posts - get all posts or search by keyword term
 * @param {Request} req 
 * @param {Response}
 */
export async function getPosts(req, res) {
    try {
        const { term } = req.query;
        const posts = await postService.getAllPosts(term);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
}

/**
 * POST /api/posts - create a new post
 * @param {*} req 
 * @param {*} res 
 */
export async function createPost(req, res) {
    try {
        const { isValid, errors } = validatePostInput(req.body);

        if (!isValid) {
            return res.status(400).json({ message: 'Validation failed', errors });
        }

        const newPost = await postService.createPost(req.body);
        return res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
}

/**
 * GET /api/posts/:id - get post by id
 * @param {*} req 
 * @param {*} res 
 */
export async function getPostById(req, res) {
    try {
        const {id} = req.params;
        const post = await postService.getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch post', error: error.message });
    }
}

export async function updatePost(req, res) {
    try {
        const { id } = req.params;
        const { isValid, errors } = validatePostInput(req.body);

        if (!isValid) {
            return res.status(400).json({ message: 'Validation failed', errors });
        }

        const updatedPost = await postService.updatePost(id, req.body);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update post', error: error.message });
    }
}

export async function deletePost(req, res) {
    try {
        const { id } = req.params;
        const deleted = await postService.deletePost(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete post', error: error.message });
    }
} 
