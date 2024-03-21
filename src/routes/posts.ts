import express, { Request, Response } from 'express';
import { listPosts, getPostById, createPost, CreatePostInput } from '../../prisma/posts';

const router = express.Router();

// Get all posts
router.get('/', async (req: Request, res: Response) => {
    try {
        const posts = await listPosts();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching posts.' });
    }
});

// Get a post by ID
router.get('/:id', async (req: Request, res: Response) => {
    const postId = req.params.id;

    try {
        const post = await getPostById(postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Post not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
});

// Create a new post
router.post('/', async (req: Request, res: Response) => {
    const { post, authorId } = req.body as CreatePostInput;

    try {
        const createdPost = await createPost({ post, authorId });
        res.status(201).json(createdPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the post.' });
    }
});

export default router;
