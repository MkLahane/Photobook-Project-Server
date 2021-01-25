const { UserInputError } = require('apollo-server-express');
const checkAuth = require('../../../../util/checkAuth');

module.exports = {
    Mutation: {
        async deleteComment(_, { commentId, photobookId }, context) {
            const user = checkAuth(context);
            try {
                console.log('Cloud name:' + process.env.CLOUDINARY_CLOUD_NAME);
                await context.prisma.like.deleteMany({
                    where: {
                        commentId: commentId
                    }
                });
                await context.prisma.comment.delete({
                    where: {
                        id: commentId
                    },
                    include: {
                        photobook: true
                    }
                });
                return await context.prisma.photobook.findUnique({
                    where: {
                        id: photobookId
                    },
                    include: {
                        comments: {
                            include: {
                                user: true
                            }
                        }
                    }
                });

            } catch (err) {
                console.log(err);
                throw new Error('Comment does not exist');
            }
        }
    }
};