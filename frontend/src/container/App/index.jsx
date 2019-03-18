import * as React from "react";
import {connect} from "react-redux";
import Routes from "../../Routes";
import {withRouter} from "react-router";
import {authActions} from "../../state/ducks/auth";

class App extends React.Component {
  componentDidMount() {
    this.props.checkLogged();
  }

  render() {
    const {isLogged, user, error} = this.props;

    return (
      <React.Fragment>
        <Routes isLogged={isLogged} user={user} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.authStore.isLogged,
  user: state.authStore.user,
  error: state.errorStore.error
});

const mapDispatchToProps = dispatch => ({
  checkLogged: () => dispatch(authActions.authVerify())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
