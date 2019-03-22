import Loadable from "react-loadable";
import Loading from "./LoadingComponent";

/**
 * Basic configuration for loadable async components.
 *
 * @see     LoadingComponent
 * @see     https://github.com/jamiebuilds/react-loadable
 *
 * @param   {Object}    opts
 * @return  {Loadable}
 */
export default opts =>
  Loadable({
    loading: Loading,
    delay: 300,
    ...opts
  });
