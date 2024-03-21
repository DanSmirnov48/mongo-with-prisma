import express, { Request, Response } from 'express';
import { listAuthors, getAuthorById, createAuthor, deleteAuthor, updateAuthor } from '../../prisma/author';
import { Author } from '@prisma/client';

const router = express.Router();

// Get all authors
router.get('/', async (req: Request, res: Response) => {
    try {
        const authors = await listAuthors();
        res.json(authors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching authors.' });
    }
});

// Get an author by ID
router.get('/:id', async (req: Request, res: Response) => {
    const authorId = req.params.id;

    try {
        const author = await getAuthorById(authorId);
        if (author) {
            res.json(author);
        } else {
            res.status(404).json({ error: 'Author not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the author.' });
    }
});

// Create a new author
router.post('/', async (req: Request, res: Response) => {
    const author: Author = req.body;

    try {
        const createdAuthor = await createAuthor({ author });
        res.status(201).json(createdAuthor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the author.' });
    }
});

// Delete an author
router.delete('/:id', async (req: Request, res: Response) => {
    const authorId = req.params.id;

    try {
        const deletedAuthor = await deleteAuthor(authorId);
        res.json(deletedAuthor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the author.' });
    }
});

// Update an author
router.put('/:id', async (req: Request, res: Response) => {
    const authorId = req.params.id;
    const updatedAuthorData: Author = req.body;

    try {
        const updatedAuthor = await updateAuthor({ id: authorId, author: updatedAuthorData });
        res.json(updatedAuthor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the author.' });
    }
});

export default router;
