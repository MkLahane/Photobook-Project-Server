const { UserInputError } = require('apollo-server-express');
const checkAuth = require('../../../../util/checkAuth');

const checkForNullEntries = (photobookInput) => {
    for (let i = photobookInput.length - 1; i >= 0; i--) {
        let photo = photobookInput[i];
        if (photo.img_id.trim() === '') {
            photobookInput.splice(i, 1);
        }
    }
};

module.exports = {
    Mutation: {
        async createPhotobook(parent, {
            photobookInput: photos, cover_image_id, cover_text
        }, context, info) {
            const user = checkAuth(context);
            if (cover_image_id.trim() === '' || cover_text.trim() === '') {
                throw new Error('No data cover image or text was provided');
            }
            checkForNullEntries(photos);
            if (photos === null || photos.length < 1) {
                throw new UserInputError('No photos were provided!');
            }

            try {
                const photobook = await context.prisma.photobook.create({
                    data: {
                        cover_image_id,
                        cover_text,
                        user: {
                            connect: { id: user.id }
                        },
                        photos: {
                            create: photos
                        }
                    },
                    include: {
                        photos: true,
                        user: true
                    }
                });
                context.pubsub.publish('NEW_PHOTOBOOK', {
                    newPhotobook: photobook
                });
                return photobook;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};