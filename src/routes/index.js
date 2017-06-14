import React from 'react'
import PropTypes from 'prop-types'
import lscache from 'lscache'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import colors from '../constants/colors'
import { Error404 } from '../components'
import {
  Login,
  Callback,
  Create,
} from '../containers'

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
    if (!!lscache.get('spotifyCPTkn')) {
      this.props.makeLogin()
    } else {
      this.props.makeLogout()
    }
  }

  render() {
    return (
      <Router
        basename={process.env.NODE_ENV === 'development' ? '' : 'spotifyCP'}
      >
        <ThemeProvider theme={colors}>
        <div>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/callback" component={Callback} exact />
            <Route path="/create" component={Create} exact />
            <Route component={Error404} />
          </Switch>
        </div>
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
