import React from 'react'
import PropTypes from 'prop-types'
import styled  from 'styled-components'
import theme from '../constants/theme'
import { Playlist, Spinner } from '../components'

function CreateView({
  inputValue,
  onInputChange,
  clearInputValue,
  playlistName,
  fetchingTracks,
  tracks,
  generatingPlaylist,
}) {
  return (
    <Wrapper>
      <InputBox>
        <Label for='name'>Write the playlist title here</Label>
        { inputValue.length > 1 &&
          <ClearInput onClick={clearInputValue}>X</ClearInput>
        }
        <Input
          id='name'
          placeholder='Write here...'
          value={inputValue}
          onChange={(value) => onInputChange(value)}
        />
        { /[^a-z ]/i.test(inputValue) &&
          <ErrorText>Just letter (A-Z) is supported</ErrorText>
        }
      </InputBox>
      <PlaylistBox>
        <div>
          <PlaylistName>{playlistName}</PlaylistName>
          { fetchingTracks &&
            <Spinner loading height={30} />
          }
        </div>
        <Playlist tracks={tracks} />
        <div>
          { tracks.length > 1 &&
            <GenerateBtn>Generate</GenerateBtn>
          }
          { generatingPlaylist &&
            <Spinner loading height={35} />
          }
        </div>
      </PlaylistBox>
    </Wrapper>
  )
}

CreateView.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  clearInputValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
  fetchingTracks: PropTypes.bool.isRequired,
  tracks: PropTypes.array.isRequired,
  generatingPlaylist: PropTypes.bool.isRequired,
}

export default CreateView

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
  display: flex;
  flex-direction: column;
`

const InputBox = styled.div`
  background-color: ${theme.inputBg};
  padding: 1.5em 2em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Label = styled.label`
  color: ${theme.white};
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: .5em;
  font-weight: 300;
`

const Input = styled.input`
  background-color: transparent;
  outline: 0;
  box-sizing: border-box;
  width: 100%;
  border: none;
  color: ${theme.white};
  caret-color: ${theme.primary};
  font-weight: 700;
  font-size: 62px;
  line-height: 1.2;
  letter-spacing: 1.5px;
  padding-right: .5em;
  @media (max-width: 425px) {
    font-size: 40px;
    padding-right: .4em;
  }
`
const ErrorText = styled.p`
  color: ${theme.errorCode};
  font-size: 14px;
  letter-spacing: 1px;
  margin-top: 3px;
  font-weight: 300;
`
const ClearInput = styled.span`
  position: absolute;
  right: 3em;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  border: 1px solid ${theme.white};
  color: ${theme.white};
  font-size: 10px;
  height: 22px;
  width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 425px) {
    font-size: 8px;
    height: 18px;
    width: 18px;
  }
`

const PlaylistBox = styled.div`
  flex: 1;
  overflow: scroll;
  padding: 3em 2em 1.5em 2em;
  @media (max-width: 425px) {
    padding-top: 2em;
  }
`

const PlaylistName = styled.h1`
  color: ${theme.primary};
  font-size: 30px;
  line-height: 1.2;
  letter-spacing: 1.5px;
  display: inline-block;
  margin-right: 15px;
  vertical-align: middle;
  @media (max-width: 425px) {
    font-size: 20px;
  }
`

const GenerateBtn = styled.button`
  background-color: transparent;
  width: 200px;
  height: 40px;
  border-radius: 20px;
  outline: 0;
  border: 2px solid ${theme.white};
  color: ${theme.white};
  font-size: 13px;
  text-transform: uppercase;
  cursor: pointer;
  margin-right: 15px;
  transition: all .4s ease;
  letter-spacing: 1.5px;
  display: inline-block;
  vertical-align: middle;
  &:hover {
    border-color: ${theme.primary};
    color: ${theme.white};
    background-color: ${theme.primary};
  }
  @media (max-width: 425px) {
    width: 170px;
    height: 33px;
    border-radius: 15px;
    font-size: 12px;
  }
`
