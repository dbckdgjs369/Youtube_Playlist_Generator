import styled from "@emotion/styled";
import Loading from "components/Loading/Loading";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  justify-content: center;
  height: 100vh;
`;
const Title = styled.h1`
  font-size: 50px;
  font-weight: 800;
`;

const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 8px;
  /* width: 300px; */
  height: 50px;
  font-size: 20px;
  background-color: white;
  border: 2px solid gray;
  /* border: none; */
  /* box-shadow: 1px 1px 2px gray; */
  color: gray;
  font-weight: 300;
  cursor: pointer;
  a {
    text-decoration: none;
    color: gray;
  }
  &:hover {
    background-color: #eee;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const FormWrapper = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  gap: 30px;

  justify-content: center;
  /* align-items: center; */
`;

const IntroWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;
const H2 = styled.h2`
  color: gray;
`;
const Img = styled.img`
  /* position: absolute;
  left: 10px;
  top: 10px; */
`;
const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
`;
const LogoText = styled.p`
  font-family: "Black Han Sans", sans-serif;

  /* font-weight; */
`;

const API_END_POINT = "https://accounts.google.com/o/oauth2/auth";
const REDIRECT_URI = "http://localhost:3000/create";
const SCOPE = "https://www.googleapis.com/auth/youtube";
const url = `${API_END_POINT}?prompt=consent&access_type=offline&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;

export default function LoginPage() {
  return (
    <LoginWrapper>
      <Logo>
        <Img src="./images/youtube.png" width="50px" alt="youtube logo" />
        <LogoText>Youtube Playlist Generator</LogoText>
      </Logo>
      <FormWrapper>
        <Title>Sign in</Title>
        <IntroWrapper>
          <H2>Welcome to YouTube Playlist Generator!!</H2>
          <H2>Sign in with google to create your own playlist</H2>
        </IntroWrapper>
        <LoginBtn>
          <img src="./images/google.png" width="30px" alt="google logo" />
          <a href={url}>Sign in with Google </a>
        </LoginBtn>
        {/* <Loading /> */}
      </FormWrapper>
    </LoginWrapper>
  );
}
