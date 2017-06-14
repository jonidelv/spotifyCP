import React from 'react'
import PropTypes from 'prop-types'
import { DarkBackground } from '../components'
import queryString  from 'query-string'
import lscache from 'lscache'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as LoginActions from '../actions/login'

class Callback extends React.Component {

  static propTypes = {
    saveErrorDescription: PropTypes.func.isRequired,
    makeLogin: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (this.props.location.hash) {
      let tkn = this.parseHash('access_token')
      let exp = this.parseHash('expires_in') / 60
      lscache.set('spotifyCPTkn', tkn, exp)
      this.props.makeLogin()
      this.props.history.push('/create')
    } else {
      let query = queryString.parse(this.props.location.search)
      let description = query.error ?
        query.error : 'Something unexpected happens try again'
      this.props.saveErrorDescription(description)
      this.props.history.push('/')
    }
  }

  parseHash = (hashName) => {
    var hash = this.props.location.hash.substr(1)
    return hash.substr(hash.indexOf(`${hashName}=`)).split('&')[0].split('=')[1]
  }

  render() {
    return (
      <DarkBackground />
    )
  }
}

function mapDispatchToProps (dispatch) {
  let actions = bindActionCreators(LoginActions, dispatch)
  return {
    saveErrorDescription: actions.saveErrorDescription,
    makeLogin: actions.makeLogin,
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Callback)
