const { UserInputError, AuthenticationError } = require('apollo-server-express');
const checkAuth = require('../../../../util/checkAuth');
const cloudinary = require('../../../../cloudinary');

module.exports = {
    Mutation: {
        async deletePhotobook(_, { photobookId }, context, info) {
            const user = checkAuth(context);
            try {
                const photobook = await context.prisma.photobook.findUnique({
                    where:
                    {
                        id: photobookId
                    },
                    include: {
                        photos: true,
                        user: true
                    }
                });
                if (photobook.userId === user.id) {
                    const imgIds = [];
                    for (let photo of photobook.photos) {
                        imgIds.push(photo.img_id);
                    }
                    imgIds.push(photobook.cover_image_id);
                    // cloudinary.api.delete_resources(['image1', 'image2'],
                    //     function (error, result) {
                    //         console.log('All photos have been successfully deleted!');
                    //         console.log(result, error);
                    //     }
                    // );
                    await cloudinary.api.delete_resources(imgIds);
                    await context.prisma.comment.deleteMany({
                        where: {
                            photobookId: photobookId
                        }
                    });
                    await context.prisma.like.deleteMany({
                        where: {
                            photobookId: photobookId
                        }
                    });
                    await context.prisma.photobook.delete({
                        where: {
                            id: photobookId
                        }
                    });
                    return photobook;
                } else {
                    throw new AuthenticationError('Not your photobook cant delete it!');
                }
            } catch (err) {
                console.log(err);
                throw new UserInputError('Photobook does not exists');
            }
        }
    }
};