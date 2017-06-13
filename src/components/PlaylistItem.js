import React from 'react'
import PropTypes from 'prop-types'
import styled  from 'styled-components'
import theme from '../constants/theme'

function PlaylistItem({ title, artist, album, duration, order }) {
  return (
    <ol>
      <Track>
        <NameContainer>
          <Order>{order}.</Order>
          <div>
            <Title>
              <Strong>{title[0]}</Strong>
              {title.substring(1)}
            </Title>
            <Description>{`${artist} - ${album}`}</Description>
          </div>
        </NameContainer>
        <div>
          <Duration>
            {`${parseInt(duration/1000/60, 10)} : ${parseInt(duration / 1000 % 60, 10)}`}
          </Duration>
        </div>
      </Track>
    </ol>
  )
}

PlaylistItem.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  order: PropTypes.number.isRequired,
}

export default PlaylistItem

//styled-components
const Track = styled.li`
  display: flex;
  justify-content: space-between;
  color: ${theme.white};
  margin-bottom: 35px;
  cursor: default;
`
const NameContainer = styled.div`
  display: flex;
  > div {
    display: flex;
    flex-direction: column;
  }
`
const Order = styled.div`
  font-size: 17px;
  margin-right: 20px;
  margin-top: 2px;
  color: ${theme.greyText};
  font-weight: 300;
`

const Title = styled.div`
  font-size: 18px;
  color: ${theme.white};
  font-weight: 300;
  text-transform: capitalize;
  padding-right: 15px;
`

const Description = styled.div`
  font-size: 15px;
  color: ${theme.greyText};
  font-weight: 300;
  text-transform: capitalize;
  margin-top: 5px;
  padding-right: 15px;
`
const Duration = styled.div`
  font-size: 16px;
  color: ${theme.greyText};
  font-weight: 300;
  margin-top: 2px;
  width: 55px;
`

const Strong = styled.span`
  color: ${theme.primary};
  font-size: 20px;
  font-weight: 400;
`
