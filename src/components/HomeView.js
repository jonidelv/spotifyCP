import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled  from 'styled-components'
import theme from '../constants/theme'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { Features,  Playlists } from '../components'

function HomeView() {
  return (
    <Wrapper>
      <Sidenav>
        <li><Link to="/browse/feature">Features</Link></li>
        <li><Link to="/browse/playlists">Playlists</Link></li>
      </Sidenav>
      {/* <Switch> */}
        {/* <Redirect from='/browse' to='/browse/feature' />
        <Redirect from='/collection' to='/collection/playlists'  /> */}
        <Route path="/browse/feature" component={Features} exact />
        <Route path="/browse/playlists" component={Playlists} exact />
      {/* </Switch> */}

      <BottomBar />
    </Wrapper>
  )
}

HomeView.propTypes = {

}

export default pure(HomeView)

//styled-components
const Wrapper = styled.div`
  background-image: linear-gradient(rgb(56, 78, 97), rgb(5, 7, 9) 85%);
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

const Sidenav = styled.div`
  background-color: rgba(0, 0, 0,.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 220px;
  overflow: auto;
  will-change: transform;
  z-index: 2;
`

const BottomBar = styled.div`
  background-color: #282828;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 115px;
  z-index: 3;
  border-bottom: 25px solid ${theme.primary};
  box-sizing: border-box;
`





/* { pathname.includes('browse') &&
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    <li><Link to="/browse/feature">Features</Link></li>
    <li><Link to="/browse/newreleases">New Releases</Link></li>
    <li><Link to="/browse/discover">Discover</Link></li>
  </ul>
}
{ pathname.includes('collection') &&
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    <li><Link to="/collection/playlists">Playlists</Link></li>
    <li><Link to="/collection/albums">Albums</Link></li>
    <li><Link to="/collection/playlists">Artists</Link></li>
  </ul>
} */
