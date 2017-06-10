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
    this.renderTask()
  }

  componentWillUpdate() {
    this.renderTask()
  }

  renderTask = () => {
    if (!this.props.loggedIn) {
      this.props.history.push('/')
      return
    }
    let pathname = this.props.location.pathname
    if (pathname === '/browse' || pathname === '/browse/') {
      this.props.history.push('/browse/feature')
    }
    if (pathname === '/collection' || pathname === '/collection/') {
      this.props.history.push('/collection/playlists')
    }
  }

  render() {
    return (
      <HomeView
        pathname={this.props.location.pathname}
      />
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
