import React from 'react'
import pure from 'recompose/pure'
import styled  from 'styled-components'
import theme from '../utils/theme'

function DarkBackground() {
  return (
    <Wrapper />
  )
}

export default pure(DarkBackground)

//styled-components
const Wrapper = styled.div`
  background: ${theme.background};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`
