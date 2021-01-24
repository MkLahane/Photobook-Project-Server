const { AuthenticationError, UserInputError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../../../config');
const jwtDecode = require('jwt-decode');



module.exports = {
    Mutation: {
        async confirm(parent, { token }, context, info) {

            try {
                const { id } = jwt.verify(token, SECRET_KEY);
                const user = await context.prisma.user.findUnique({ where: { id } });

                if (!user.confirmed) {
                    const user = await context.prisma.user.update({
                        where: { id: id },
                        data: { confirmed: true },
                    });

                    return 'User registered successfully!';
                } else {
                    throw new Error();
                }
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }

        }
    }
};