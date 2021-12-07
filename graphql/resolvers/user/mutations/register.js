const { UserInputError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const { validateRegisterInput } = require("../../../../util/validators");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../../../config");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

module.exports = {
  Mutation: {
    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }

      const existingUser = await context.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "Please confirm your account",
          },
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = await context.prisma.user.create({
        data: {
          username,
          email,
          password,
          confirmed: true,
        },
      });

      jwt.sign(
        {
          id: newUser.id,
          username: newUser.username,
        },
        SECRET_KEY,
        {
          expiresIn: "1d",
        },
        (err, emailToken) => {
          const url = `http://localhost:3000/confirmation/${emailToken}`;
          console.log(url);
          transporter.sendMail({
            to: email,
            subject: "Confirm Email",
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
          });
        }
      );
      return newUser;
    },
  },
};
