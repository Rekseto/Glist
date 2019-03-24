const RegisterFailedError = require("../../errors/RegisterFailedError");
const AuthWrongCredentialsError = require("../../errors/AuthWrongCredentialsError");
const NotFound = require("../../errors/NotFound");
const { generateToken } = require("../../helpers/authUtils");
const {
  hashWithRandomSalt,
  getRandomString,
  compare
} = require("../../helpers/cryptoUtils");

module.exports = ({ database, logger }) => {
  const { User } = database.models;

  return {
    async create({ username, password }) {
      try {
        const users = await User.find();
        if (users.length > 0) {
          throw new RegisterFailedError();
        }
        if (!password) {
          throw new RegisterFailedError();
        }

        const data = await User.create({
          username: username,
          password: hashWithRandomSalt(password),
          secret: getRandomString(16)
        });

        return data;
      } catch (error) {
        logger.error(error);
        throw error;
      }
    },

    async login({ username, password }) {
      const userRecord = await User.findOne({ username });

      if (!userRecord) {
        throw new NotFound();
      }

      if (!password) {
        throw new AuthWrongCredentialsError("Provided empty password");
      }

      if (compare(password, userRecord.password)) {
        const token = generateToken({
          id: userRecord._id,
          secret: userRecord.secret
        });

        const userData = {
          id: userRecord._id,
          username: userRecord.username
        };

        return { token, userData };
      } else {
        throw new AuthWrongCredentialsError();
      }
    },
    async logout({ username }) {
      try {
        const userRecord = await User.findOne({ username });
        if (!userRecord) {
          throw new NotFound();
        }
        userRecord.secret = getRandomString(16);
        await userRecord.save();
      } catch (error) {
        logger.error(error);
        throw error;
      }
    }
  };
};
