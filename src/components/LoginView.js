import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled, { css }  from 'styled-components'
import loginBackground from '../assets/login-background.jpg'
import checkmark from '../assets/checkmark.png'
import logo from '../assets/logo.png'
import theme from '../constants/theme'

function LoginView({ onPressLoginBtn, errorDescription }) {
  return (
    <Wrapper>
      <Overlay>
        <Container>
          <Form>
            <Logo />
            <LoginText>Login using your Spotify credentials</LoginText>
            <LoginBtn onClick={onPressLoginBtn}>Login</LoginBtn>
            <ForgotPassword
              href={'https://www.spotify.com/it/password-reset/'}
              target={'_blank'}
            >
              Forgot Password ?
            </ForgotPassword>
            { errorDescription &&
              <ErrorText>{errorDescription}</ErrorText>
            }
          </Form>
          <Slogan>
            <Title>Get the perfect Music Right Now</Title>
            <Subtitle>Listen to millions of songs for free</Subtitle>
            <div>
              <Checkmark />
              <CheckmarkText>
                Search and discover music that you will love
              </CheckmarkText>
            </div>
            <div>
              <Checkmark />
              <CheckmarkText>
                Create playlists with your favorite music
              </CheckmarkText>
            </div>
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
  background: ${theme.darkBg};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(${loginBackground});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1;
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
  background-color: rgba(0, 0, 0, .6);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
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
  @media (max-width: 500px) {
    overflow: scroll;
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
  padding: 70px 50px 70px;
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
`

const Subtitle = styled.h2`
  font-size: 28px;
  margin-bottom: 35px;
  font-weight: 200;
`

const Checkmark = styled.span`
  width: 30px;
  height: 25px;
  margin-right: 15px;
  background-image: url(${checkmark});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
  display: inline-block;
  vertical-align: top;
  @media (max-width: 400px) {
    display: none;
  }
`

const CheckmarkText = styled.span`
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 7px;
  display: inline-block;
  vertical-align: top;
  @media (max-width: 450px) {
    font-size: 14px;
  }
  @media (max-width: 400px) {
    display: none;
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
`

const LoginBtn = styled.button`
  background-color: transparent;
  width: 99%;
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

const ForgotPassword = styled.a`
  cursor: pointer;
  margin-top: 25px;
  display: block;
  font-size: 12px;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`

const ErrorText = styled.p`
  margin-top: 25px;
  display: block;
  font-size: 15px;
  text-align: center;
  color: ${theme.errorCode};
`
