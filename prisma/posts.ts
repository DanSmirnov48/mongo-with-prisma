import { PrismaClient, Post } from '@prisma/client'

const prisma = new PrismaClient()

export interface CreatePostInput {
    post: Post;
    authorId: any
}

export const createPost = async ({ post, authorId }: CreatePostInput) => {
    const createdPost = await prisma.post.create({
        data: {
            title: post.title,
            content: post.content,
            author: {
                connect: {
                    id: authorId,
                },
            },
        },
    });

    return createdPost;
};

export const listPosts = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: true
        }
    })

    return posts
}

export const getPostById = async (id: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id,
        },
        include: {
            author: true,
        },
    });

    return post;
}