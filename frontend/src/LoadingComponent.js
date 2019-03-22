import React from "react";

/**
 * Handles loading and error screens.
 *
 * @see     LoadableComponent
 * @see     https://github.com/jamiebuilds/react-loadable
 *
 * @param   {Boolean}     isLoading
 * @param   {Boolean}     pastDelay
 * @param   {Error|false} error
 * @param   {Function}    retry
 */
export default ({isLoading, pastDelay, error, retry}) => {
  // Handle the loading state. Using "pastDelay" to prevent flashes when page
  // loads too quickly:
  if (pastDelay) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  // Handle the error state:
  if (error) {
    return (
      <div>
        <p>Sorry, there was a problem loading the page.</p>
        <button onClick={retry}>Retry</button>
      </div>
    );
  }

  return null;
};
