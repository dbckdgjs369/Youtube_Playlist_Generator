import styled from "@emotion/styled";

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 1.5rem;
  top: 1.25rem;
  padding: 8px 16px 8px 8px;
  border-radius: 999px;
  background: var(--ypg-glass);
  border: 1px solid var(--ypg-border);
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 18px -12px rgba(15, 17, 21, 0.4);
  z-index: 10;
`;

const LogoText = styled.p`
  font-family: "Black Han Sans", sans-serif;
  font-size: 18px;
  letter-spacing: -0.01em;
  background: linear-gradient(135deg, #ff2d55, #d60029);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <img src="./images/youtube.png" width="34px" alt="youtube logo" />
      <LogoText>Youtube Playlist Generator</LogoText>
    </LogoWrapper>
  );
};

export default Logo;
