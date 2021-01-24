const { UserInputError } = require('apollo-server-express');
const checkAuth = require('../../../../util/checkAuth');

module.exports = {
    Mutation: {
        async createComment(parent, { photobookId, body }, context, info) {
            const user = checkAuth(context);
            if (body.trim() === '') {
                throw new UserInputError('Comment cannot be empty!');
            }
            const comment = await context.prisma.comment.create({
                data: {
                    body,
                    user: {
                        connect: { id: user.id }
                    },
                    photobook: {
                        connect: { id: photobookId }
                    }
                }
            });
            const photobook = await context.prisma.photobook.findUnique({
                where: {
                    id: photobookId
                },
                include: {
                    photos: true,
                    user: true,
                    comments: {
                        include: {
                            user: true
                        }
                    },
                    likes: {
                        include: {
                            user: true
                        }
                    }
                }

            });
            return photobook;
        }
    }
}