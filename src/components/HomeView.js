import React from 'react'
//import PropTypes from 'prop-types'
import styled  from 'styled-components'
import theme from '../constants/theme'

function HomeView() {
  return (
    <Wrapper>
    </Wrapper>
  )
}

HomeView.propTypes = {

}

export default HomeView

//styled-components
const Wrapper = styled.div`
  background-image: ${theme.background};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  padding-left: 250px;
  color: lightgrey;
`
