const userResolvers = require('./user/index');
const photobookResolvers = require('./photobook/index');

module.exports = {
    Photobook: {
        likesCount: async (parent, _, context) => {
            return await context.prisma.like.count({ where: { photobookId: parent.id } });
        },
        commentsCount: async (parent, _, context) => {
            return await context.prisma.comment.count({ where: { photobookId: parent.id } });
        }
    },
    Comment: {
        likesCount: async (parent, _, context) => {
            return await context.prisma.like.count({ where: { commentId: parent.id } });
        }
    },
    Query: {
        ...photobookResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...photobookResolvers.Mutation
    },
    Subscription: {
        ...photobookResolvers.Subscription
    }
};