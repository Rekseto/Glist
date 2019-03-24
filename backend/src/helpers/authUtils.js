const jwt = require("jsonwebtoken");
const base64 = require("base64url");

/**
 * Generates a JSON Web Token for a given user id and user secret.
 *
 * @param   {Mongoose} record      User record from database
 * @param   {number}    expiresIn   Expiration date (in seconds)
 * @return  {string}                Signed JSON Web Token
 */
function generateToken(record, expiresIn = 86400) {
  const serverSecret = String(process.env.AUTH_SECRET);
  const tokenSecret = `${record.secret}@${serverSecret}`;

  return jwt.sign({ id: record.id }, tokenSecret, { expiresIn });
}

/**
 * Decodes a given JWT and returns its header, payload and signature.
 *
 * @param   {string}    token       Encoded JSON Web Token
 * @return  {Object}                Decoded JSON Web Token
 * @throws  {Error}                 When cannot decode
 */
function decodeToken(token) {
  const encodedToken = token.split(".");

  return {
    header: JSON.parse(base64.decode(encodedToken[0])),
    payload: JSON.parse(base64.decode(encodedToken[1])),
    signature: encodedToken[2]
  };
}

/**
 * Extracts token from Koa context:
 * - `Authorization` header;
 * - `authorization` query;
 *
 * @param   {Object}    ctx         Koa.js context
 * @return  {?string}               Encoded JSON Web Token
 * @throws  {Error}                 When cannot extract token
 */
function extractToken(ctx) {
  if (ctx.header && ctx.header.authorization) {
    return ctx.header.authorization;
  }

  if (ctx.query && ctx.query.authorization) {
    return ctx.query.authorization;
  }

  throw new Error("Cannot extract JWT token from context");
}

module.exports = {
  extractToken,
  decodeToken,
  generateToken
};
