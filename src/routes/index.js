import React from 'react'
import PropTypes from 'prop-types'
import lscache from 'lscache'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { palette } from '../constants'
import { Error404 } from '../components'
import { storageKey } from '../constants'
import {
  Login,
  Callback,
  Create,
} from '../containers'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as LoginActions from '../actions/login'

const checkTkn = (props) => () => {
  const data = lscache.get(storageKey)
  const token = data && data.token
  if (!!token) {
    props.makeLogin()
  } else {
    props.makeLogout()
  }
}

const Routes = (props) => {
  // Similar to comp will mount or construct
  React.useMemo(checkTkn(props), [])
  React.useEffect(checkTkn(props))

  return (
    <Router
      basename={process.env.NODE_ENV === 'development' ? '' : 'spotifyCP'}
    >
      <ThemeProvider theme={palette}>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/callback" component={Callback} exact />
          <Route path="/create" component={Create} exact />
          <Route component={Error404} />
        </Switch>
      </ThemeProvider>
    </Router>
  )
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

Routes.propTypes = {
  makeLogin: PropTypes.func.isRequired,
  makeLogout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes)
