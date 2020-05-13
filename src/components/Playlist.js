import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { PlaylistItem } from '../components'

const Playlist = ({ tracks })  => {
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

export default React.memo(Playlist)

//styled-components
const Wrapper = styled.ol`
  margin: 50px 0;
`
