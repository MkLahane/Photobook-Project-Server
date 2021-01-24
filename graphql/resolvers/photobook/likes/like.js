const { UserInputError } = require('apollo-server-express');
const checkAuth = require('../../../../util/checkAuth');

module.exports = {
    Mutation: {
        async likePhotobook(parent, { photobookId }, context, info) {
            const user = checkAuth(context);
            try {
                const likedAlready = await context.prisma.like.findUnique({
                    where: {
                        photobook_liked: {
                            userId: user.id,
                            photobookId
                        }
                    }
                });
                if (likedAlready !== null) {
                    //if liked already unlike it 
                    await context.prisma.like.delete({
                        where: {
                            photobook_liked: {
                                userId: user.id,
                                photobookId
                            }
                        }
                    });
                } else { //like it 
                    await context.prisma.like.create({
                        data: {
                            user: { connect: { id: user.id } },
                            photobook: { connect: { id: photobookId } }
                        }
                    });
                }
                return await context.prisma.photobook.findUnique({
                    where: {
                        id: photobookId
                    },
                    include: {
                        likes: {
                            include: {
                                user: true
                            }
                        }
                    }
                });
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async likeComment(_, { commentId, photobookId }, context, info) {
            const user = checkAuth(context);
            try {
                const likedAlready = await context.prisma.like.findUnique({
                    where: {
                        comment_liked: {
                            userId: user.id,
                            commentId
                        }
                    }
                });
                if (likedAlready !== null) {
                    //if liked already unlike it 
                    await context.prisma.like.delete({
                        where: {
                            comment_liked: {
                                userId: user.id,
                                commentId
                            }
                        }
                    });
                } else { //like it 
                    await context.prisma.like.create({
                        data: {
                            user: { connect: { id: user.id } },
                            comment: { connect: { id: commentId } }
                        }
                    });
                }
                return await context.prisma.photobook.findUnique({
                    where: {
                        id: photobookId
                    },
                    include: {
                        comments: {
                            include: {
                                likes: {
                                    include: {
                                        user: true
                                    }
                                }
                            },
                            orderBy: {
                                created_at: 'desc'
                            }
                        }
                    }
                });
            }
            catch (err) {
                throw new Error(err);
            }
        }
    }
};