import { PrismaClient, Author } from '@prisma/client'

const prisma = new PrismaClient()

export const createAuthor = async ({ author }: { author: Author }) => {
    const createdAuthor = await prisma.author.create({
        data: {
            name: author.name,
            email: author.email,
            role: author.role
        },
    });

    return createdAuthor;
};

export const listAuthors = async () => {
    const authors = await prisma.author.findMany({
        include: {
            posts: true
        }
    });

    return authors;
};

export const getAuthorById = async (id: string) => {
    const author = await prisma.author.findUnique({
        where: {
            id,
        },
        include: {
            posts: true
        },
    });

    return author;
};

export const updateAuthor = async ({ id, author }: { id: string, author: Author }) => {
    const updatedAuthor = await prisma.author.update({
        where: {
            id,
        },
        data: {
            name: author.name,
            email: author.email,
            role: author.role
        },
    });

    return updatedAuthor;
};

export const deleteAuthor = async (id: string) => {
    const deletedAuthor = await prisma.author.delete({
        where: {
            id,
        },
    });

    return deletedAuthor;
};