const bcrypt = require('bcryptjs');
const { validateLoginInput } = require('../../../../util/validators');
const { UserInputError } = require('apollo-server-express');
const generateToken = require('../../../../util/generateToken');

module.exports = {
    Mutation: {
        async login(parent, { email, password }, context, info) {
            const { errors, valid } = validateLoginInput(email, password);
            if (!valid) {
                throw new UserInputError('Errors', {
                    errors
                });
            }
            const user = await context.prisma.user.findUnique({ where: { email } });
            if (!user) {
                errors.general = 'Incorrect username/password';
                throw new UserInputError('Incorrect username/password', { errors });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                errors.general = 'Incorrect username/password';
                throw new UserInputError('Incorrect username/password', { errors });
            }
            if (!user.confirmed) {
                errors.general = 'Please confirm your account';
                throw new UserInputError('Please confirm your account', { errors });
            }
            const token = generateToken(user);
            return {
                ...user,
                token
            };
        }
    }
};