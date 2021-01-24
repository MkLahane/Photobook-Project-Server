const { UserInputError } = require('apollo-server-express');
const { getOperationAST } = require('graphql');
const checkAuth = require('../../../../util/checkAuth');

module.exports = {
    Query: {
        async getPhotobook(parent, { photobookId }, context, info) {
            const photobook = await context.prisma.photobook.findUnique({
                where: {
                    id: photobookId
                },
                include: {
                    photos: true,
                    user: true,
                    comments: {
                        include: {
                            user: true,
                            likes: {
                                include: {
                                    user: true
                                }
                            }
                        },
                        orderBy: {
                            created_at: 'desc'
                        }
                    },
                    likes: {
                        include: {
                            user: true
                        }
                    }
                }

            });
            if (photobook) {
                return photobook;
            } else {
                throw new UserInputError('Photobook does not exist');
            }

        }
    }
};