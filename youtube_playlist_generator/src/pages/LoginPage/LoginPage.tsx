import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  justify-content: center;
`;

const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 300px;
  height: 50px;
  font-size: 20px;
  background-color: white;
  border: none;
  box-shadow: 1px 1px 2px gray;
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

const API_END_POINT = "https://accounts.google.com/o/oauth2/auth";
const REDIRECT_URI = "http://localhost:3000/create";
const SCOPE = "https://www.googleapis.com/auth/youtube";
const url = `${API_END_POINT}?prompt=consent&access_type=offline&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;

console.log(url);
export default function LoginPage() {
  return (
    <Wrapper>
      <img src="./images/youtube.png" width="50px" alt="youtube logo" />
      <h1>Welcome to YouTube Playlist Generator!!</h1>
      <h2>Log in to the account you want to create a playlist for </h2>
      <LoginBtn>
        <img src="./images/google.png" width="30px" alt="google logo" />
        <a href={url}>Sign in with Google </a>
      </LoginBtn>
    </Wrapper>
  );
}
