import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled, { css }  from 'styled-components'
import bg from '../assets/bg.png'
import logo from '../assets/logo.png'
import theme from '../utils/theme'

function LoginView({ onPressLoginBtn, errorDescription }) {
  return (
    <Wrapper>
      <Overlay>
        <Container>
          <Form>
            <Logo />
            <LoginText>Login using your Spotify credentials</LoginText>
            <LoginBtn onClick={onPressLoginBtn}>Login</LoginBtn>
            { errorDescription &&
              <ErrorText>{errorDescription}</ErrorText>
            }
          </Form>
          <Slogan>
            <Title>Get the perfect Playlist Right Now</Title>
            <Subtitle>
              Generate a playlist where the first letter of each song match the album name
            </Subtitle>
          </Slogan>
        </Container>
      </Overlay>
    </Wrapper>
  )
}

LoginView.propTypes = {
  onPressLoginBtn: PropTypes.func.isRequired,
  errorDescription: PropTypes.string.isRequired,
}

export default pure(LoginView)

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
  background-image: url(${bg});
  background-size: 150%;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1;
  @media (max-width: 800px) {
    background-size: cover;
  }
`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, .75);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  @media (max-width: 768px) {
    overflow: scroll;
  }
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-width: 1000px;
  margin: auto;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Share = css`
  color: ${theme.white};
  align-self: center;
  width: 35%;
  @media (max-width: 768px) {
    width: 90%;
  }
`
const Form = styled.div`
  ${Share};
  padding-right: 20px;
  padding: 20px 50px 70px;
  flex: 1;
  @media (max-width: 768px) {
    padding: 70px 50px 20px 50px;
  }
  @media (max-width: 500px) {
    padding: 40px 50px 20px 50px;
  }
  @media (max-width: 400px) {
    padding: 60px 50px 20px 50px;
  }
`

const Slogan = styled.div`
  ${Share};
  text-align: left;
  border-left: 1px solid ${theme.white};
  padding: 60px 0 60px 50px;
  cursor: default;
  flex: 2;
  @media (max-width: 768px) {
    width: 90%;
    flex: 1;
    border: 0;
    padding: 20px 50px 60px 50px;
    text-align: center;
  }
  @media (max-width: 500px) {
    padding: 20px 50px 40px 50px;
  }
`

const Title = styled.h1`
  color: ${theme.primary};
  font-size: 50px;
  font-weight: 500;
  margin-bottom: 35px;
  line-height: 55px;
  @media (max-width: 550px) {
    font-size: 35px;
  }
  @media (max-width: 375px) {
    margin-bottom: 30px;
    font-size: 28px;
    line-height: 35px;
  }
`

const Subtitle = styled.h2`
  font-size: 28px;
  margin-bottom: 35px;
  font-weight: 200;
  font-weight: 400;
  line-height: 35px;
  padding-right: 20px;
  @media (max-width: 550px) {
    font-size: 18px;
  }
  @media (max-width: 375px) {
    font-size: 14px;
    line-height: 25px;
  }
`

const Logo = styled.div`
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 70px;
  margin-bottom: 30px;
`

const LoginText = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  @media (max-width: 400px) {
    line-height: 25px;
  }
`

const LoginBtn = styled.button`
  background-color: transparent;
  letter-spacing: 1.5px;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  outline: 0;
  border: 2px solid ${theme.white};
  color: ${theme.white};
  font-size: 13px;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 10px;
  transition: all .4s ease;
  &:hover {
    border-color: ${theme.primary};
    color: ${theme.white};
    background-color: ${theme.primary};
  }
`

const ErrorText = styled.p`
  margin-top: 25px;
  display: block;
  font-size: 15px;
  text-align: center;
  color: ${theme.errorCode};
`
