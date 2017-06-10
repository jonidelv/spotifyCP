import React from 'react'
import PropTypes from 'prop-types'
import styled  from 'styled-components'
import theme from '../constants/theme'
import { Route, Link } from 'react-router-dom'
import { Features,  Playlists } from '../components'

function HomeView({ pathname }) {
  return (
    <Wrapper>
      <Sidenav>



        <Link to="/browse/feature">
          <NavLink active={pathname.includes('browse')}>Features</NavLink>
        </Link>
        <Link to="/collection/playlists">
          <NavLink active={pathname.includes('collection')}>Playlists</NavLink>
        </Link>
      </Sidenav>

        <Route path="/browse/feature" component={Features} />
        <Route path="/collection/playlists" component={Playlists} />

      <BottomBar>
        <PlayerText>Html5 player coming soon</PlayerText>
      </BottomBar>
    </Wrapper>
  )
}

HomeView.propTypes = {
  pathname: PropTypes.string.isRequired,
}

export default HomeView

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
  padding: 24px;
  box-sizing: border-box;
`

const BottomBar = styled.div`
  background-color: #282828;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 3;
  box-sizing: border-box;
`

const NavLink = styled.span`
  color: ${(props) => props.active ? theme.primary : theme.white}
`
const PlayerText = styled.div`
  color: ${theme.white};
  font-weight: 300;
  position: fixed;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
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
