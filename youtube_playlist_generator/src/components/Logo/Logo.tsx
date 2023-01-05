import styled from "@emotion/styled";

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  left: 1rem;
  top: 1rem;
`;
const LogoText = styled.p`
  font-family: "Black Han Sans", sans-serif;
`;
const Logo = () => {
  return (
    <LogoWrapper>
      <img src="./images/youtube.png" width="50px" alt="youtube logo" />
      <LogoText>Youtube Playlist Generator</LogoText>
    </LogoWrapper>
  );
};

export default Logo;
