import React from 'react'
import PropTypes from 'prop-types'
import { HomeView } from '../components'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../actions/home'

class Home extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    if (!this.props.loggedIn) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <HomeView />
    )
  }
}

function mapStateToProps (state) {
  return {
    loggedIn: state.login.loggedIn,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(homeActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)

// children={this.props.children}
