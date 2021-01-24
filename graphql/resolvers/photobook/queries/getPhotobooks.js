const { getOperationAST } = require('graphql');
const checkAuth = require('../../../../util/checkAuth');

module.exports = {
    Query: {
        async getPhotobooks(parent, args, context, info) {
            return await context.prisma.photobook.findMany({
                orderBy: [
                    {
                        created_at: 'desc'
                    }
                ],
                include: {
                    photos: true,
                    user: true,
                    likes: {
                        include: {
                            user: true
                        }
                    }
                }
            });
        }
    }
};