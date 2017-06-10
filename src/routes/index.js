import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import colors from '../constants/colors'
import { Error404, Features,  Playlists } from '../components'
import {
  Login,
  Callback,
  Home,
} from '../containers'
import lscache from 'lscache'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as LoginActions from '../actions/login'

class Routes extends React.Component {

  static propTypes = {
    makeLogin: PropTypes.func.isRequired,
    makeLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    this.checkTkn()
  }

  componentWillUpdate() {
    this.checkTkn()
  }

  checkTkn = () => {
    if (!!lscache.get('sporifyTkn')) {
      this.props.makeLogin()
    } else {
      this.props.makeLogout()
    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={colors}>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/callback" component={Callback} exact />
            {/* { this.props.loggedIn &&
              <Home />
            } */}

            <Route path="/browse" component={Home}  />
            {/* <Route path="/collection" component={Home} /> */}

            <Route component={Error404} />
          </Switch>
        </ThemeProvider>
      </Router>
    )
  }
}

function mapStateToProps (state) {
  return {
    loggedIn: state.login.loggedIn,
  }
}

function mapDispatchToProps (dispatch) {
  let actions = bindActionCreators(LoginActions, dispatch)
  return {
    makeLogin: actions.makeLogin,
    makeLogout: actions.makeLogout,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes)
