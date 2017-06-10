import React from 'react'
import PropTypes from 'prop-types'
import { CreateView } from '../components'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CreateActions from '../actions/create'

class Create extends React.Component {

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
  }

  render() {
    return (
      <CreateView />
    )
  }
}

function mapStateToProps (state) {
  return {
    loggedIn: state.login.loggedIn,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(CreateActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create)
