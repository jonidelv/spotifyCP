import React from 'react'
import PropTypes from 'prop-types'
import { LoginView } from '../components'
import sites from '../constants/sites'
import { connect } from 'react-redux'

class Login extends React.Component {

  static propTypes = {
    errorDescription: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.history.push('/create')
    }
  }

  transitionLogin = () => {
    let callback = process.env.NODE_ENV === 'development' ?
      `${sites.dev}/callback` : `${sites.prod}/callback`
    let redirect = encodeURIComponent(callback)
    let base = 'https://accounts.spotify.com/'
    let client = '2b4ed4588a8040098b2b70149e79c948'
    let scope = 'user-read-private user-library-read user-read-email user-top-read playlist-read-private'
    let scopeUri = encodeURIComponent(scope)
    let url = `${base}authorize?client_id=${client}&redirect_uri=${redirect}&scope=${scopeUri}&response_type=token`
    window.location.replace(url)
  }

  render() {
    return (
      <LoginView
        onPressLoginBtn={this.transitionLogin}
        errorDescription={this.props.errorDescription}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    errorDescription: state.login.errorDescription,
    loggedIn: state.login.loggedIn,
  }
}

export default connect(
  mapStateToProps,
  null,
)(Login)
