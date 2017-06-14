import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import ring from '../assets/ring.svg'
import styled  from 'styled-components'

function Spinner({ loading, height }) {
  return !loading ? null :
    <Ring
      src={ring}
      height={height || 40}
      width={height || 40}
      alt={'Loading Spinner'}
    />
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  height: PropTypes.number,
}

export default pure(Spinner)

const Ring = styled.img`
  display: inline-block;
  vertical-align: middle;
`
