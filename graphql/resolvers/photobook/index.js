const createPhotobookResolver = require('./mutations/create');
const deletePhotobookResolver = require('./mutations/delete');
const getPhotobooksResolver = require('./queries/getPhotobooks');
const getPhotobookResolver = require('./queries/getPhotobook');
const createCommentResolver = require('./comments/create');
const deleteCommentResolver = require('./comments/delete');
const likePhotobookResolver = require('./likes/like');

module.exports = {
    Query: {
        ...getPhotobookResolver.Query,
        ...getPhotobooksResolver.Query
    },
    Mutation: {
        ...createPhotobookResolver.Mutation,
        ...deletePhotobookResolver.Mutation,
        ...createCommentResolver.Mutation,
        ...deleteCommentResolver.Mutation,
        ...likePhotobookResolver.Mutation
    },
    Subscription: {
        newPhotobook: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_PHOTOBOOK')
        }
    }
};