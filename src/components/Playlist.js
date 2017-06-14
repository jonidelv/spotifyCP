import React from 'react'
import PropTypes from 'prop-types'
import styled  from 'styled-components'
import { PlaylistItem } from '../components'

function Playlist({ tracks }) {
  return (
    <Wrapper>
      {
        tracks.map((track, i) => (
          <PlaylistItem
            key={i}
            order={i+1}
            title={track.title}
            artist={track.artist}
            album={track.album}
            duration={track.duration}
            link={track.link}
          />
        ))
      }
    </Wrapper>
  )
}

Playlist.propTypes = {
  tracks: PropTypes.array.isRequired,
}

export default Playlist

//styled-components
const Wrapper = styled.ol`
  margin: 50px 0;
`
