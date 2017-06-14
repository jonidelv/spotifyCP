import React from 'react'
import PropTypes from 'prop-types'
import styled  from 'styled-components'
import theme from '../utils/theme'
import millisToMinutes from '../utils/millisToMinutes'

function PlaylistItem({ title, artist, album, duration, order, link }) {
  return (
    <Track>
      <NameContainer>
        <Order>{order}.</Order>
        <Link href={link} target={'_blank'}>
          <Title>
            <Strong>{title[0]}</Strong>
            {title.substring(1)}
          </Title>
          <Description>{`${artist} - ${album}`}</Description>
        </Link>
      </NameContainer>
      <div>
        <Duration>{millisToMinutes(duration)}</Duration>
      </div>
    </Track>
  )
}

PlaylistItem.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  order: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
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
  width: 22px;
`

const Title = styled.div`
  font-size: 18px;
  color: ${theme.white};
  font-weight: 300;
  text-transform: capitalize;
  padding-right: 15px;
  &:hover {
    color: ${theme.primary};
  }
`

const Description = styled.div`
  font-size: 15px;
  color: ${theme.greyText};
  font-weight: 300;
  text-transform: capitalize;
  margin-top: 5px;
  padding-right: 15px;
`

const Link = styled.a`
  display: block;
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
