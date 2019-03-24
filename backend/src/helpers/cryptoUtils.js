const crypto = require("crypto");

/**
 * Generates a random string of a given `length`.
 *
 * @param   {number}    length        Length of the random string to generate
 * @return  {string}                  Generated random string
 */
function getRandomString(length = 32) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

/**
 * Returns an object containing `salt` and SHA512 encrypted `password`.
 *
 * @param   {string}    password      Password to hash
 * @param   {string}    salt          Salt to hash password with
 * @return  {Object}    result        Object containing salt and hash
 * @return  {string}    result.salt
 * @return  {string}    result.hash
 */
function sha512(password, salt) {
  const hmac = crypto.createHmac("sha512", salt).update(password);
  const hash = hmac.digest("hex");

  return { salt, hash };
}

/**
 * Creates and returns a hash for a given `password` and `salt`.
 *
 * @param   {string}    password      Password to hash
 * @param   {string}    salt          Salt to hash password with
 * @return  {string}                  Generated hash
 */
function hash(password, salt) {
  const encrypted = sha512(password, salt);

  return `${encrypted.salt}@${encrypted.hash}`;
}

/**
 * Creates a hash for a given `password` with random salt.
 *
 * @param   {string}    password      Password to hash
 * @return  {string}                  Generated hash
 */
function hashWithRandomSalt(password) {
  return hash(password, getRandomString(16));
}

/**
 * Compares a plain password against a given hash and returns true if they are
 * associated.
 *
 * @param   {string}    plain         Plain password
 * @param   {string}    hashed        Hashed password
 * @return  {boolean}                 Whether they are associated
 */
function compare(plain, hashed) {
  const salt = hashed.split("@")[0];

  return hash(plain, salt) === hashed;
}

module.exports = {
  compare,
  hashWithRandomSalt,
  getRandomString,
  sha512
};
