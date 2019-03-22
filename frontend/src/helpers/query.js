/**
 * Gets a query string from url.
 *
 * @param   {string}  name
 * @param   {string}  url
 * @returns {string|null}
 */
export function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Creates a valid query in www-form-urlencoded format.
 *
 * @param   {Object}  object  Object to create query string from
 * @returns {string}          Generated query string
 */
export function urlencoded(object) {
  return Object.keys(object)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
    .join("&");
}

/**
 * Creates a query string from object.
 *
 * @param   {Object}  object  Object to create query string from
 * @returns {string}          Generated query string
 */
export function query(object = {}) {
  return `?${urlencoded(object)}`;
}
