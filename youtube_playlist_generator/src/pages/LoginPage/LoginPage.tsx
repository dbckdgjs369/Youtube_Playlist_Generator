import styled from "@emotion/styled";
import Logo from "components/Logo/Logo";

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 440px;
  background: var(--ypg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--ypg-border);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: var(--ypg-shadow);
  display: flex;
  flex-direction: column;
  gap: 28px;
  text-align: center;
`;

const Badge = styled.div`
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 0, 51, 0.08);
  color: #d60029;
  font-size: 13px;
  font-weight: 700;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--ypg-ink);
  word-break: keep-all;
`;

const Highlight = styled.span`
  background: linear-gradient(135deg, #ff2d55, #d60029);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Desc = styled.p`
  color: var(--ypg-muted);
  font-size: 15px;
  line-height: 1.6;
`;

const LoginBtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  height: 54px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  background-color: var(--ypg-card-solid);
  border: 1.5px solid var(--ypg-border);
  color: var(--ypg-ink);
  cursor: pointer;
  transition: box-shadow 0.15s ease, transform 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    border-color: var(--ypg-faint);
    box-shadow: 0 10px 24px -14px rgba(15, 17, 21, 0.4);
    transform: translateY(-1px);
  }
`;

const Note = styled.p`
  color: var(--ypg-faint);
  font-size: 12px;
  line-height: 1.5;
`;

const API_END_POINT = "https://accounts.google.com/o/oauth2/auth";
// 배포/로컬 자동 대응 (Google Console 승인된 리디렉션 URI에 등록 필요)
const REDIRECT_URI = `${window.location.origin}/create`;
const SCOPE = "https://www.googleapis.com/auth/youtube";
const url = `${API_END_POINT}?prompt=consent&access_type=offline&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;

export default function LoginPage() {
  return (
    <LoginWrapper>
      <Logo />
      <Card>
        <Badge>🎵 YouTube Playlist Generator</Badge>
        <div>
          <Title>
            타임라인을 <Highlight>재생목록</Highlight>으로
          </Title>
        </div>
        <Desc>
          영상 댓글의 타임라인만 붙여넣으면, 원하는 곡만 골라 내 YouTube
          재생목록으로 자동 생성해 드려요.
        </Desc>
        <LoginBtn href={url}>
          <img src="./images/google.png" width="24px" alt="google logo" />
          Google 계정으로 시작하기
        </LoginBtn>
        <Note>
          재생목록 생성을 위해 YouTube 계정 접근 권한이 필요합니다.
        </Note>
      </Card>
    </LoginWrapper>
  );
}
