import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'


function RedirectIf({component: Component, to, evaluate, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => evaluate === true
        ? <Component {...props} />
        : <Redirect to={{pathname: to, state: {from: props.location}}} />}
    />
  )
}

RedirectIf.propTypes = {
  component: PropTypes.func.isRequired,
  evaluate: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
}

export default RedirectIf
