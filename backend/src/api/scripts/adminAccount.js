const authServices = require("../services/authServices");

module.exports = async function({ database, logger }) {
  const authService = authServices({ database, logger });

  const { User } = database.models;

  try {
    const user = await User.findOne({ username: "admin" });
    if (!user) {
      await authService.create({
        username: "admin",
        password: "test"
      });
    }
  } catch (error) {
    logger.error(error.message);
  }
};
