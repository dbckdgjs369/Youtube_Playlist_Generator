import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 12px 10px 10px;
  background-color: var(--ypg-card-solid);
  border: 1px solid var(--ypg-border);
  border-radius: 14px;
  gap: 14px;
  align-items: center;
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    box-shadow: 0 10px 22px -16px rgba(15, 17, 21, 0.5);
    transform: translateY(-1px);
  }
`;

const Thumb = styled.a`
  position: relative;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  line-height: 0;
`;

const Img = styled.img`
  width: 120px;
  height: 68px;
  object-fit: cover;
  display: block;
`;

const Play = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 22px;
  opacity: 0;
  background: rgba(0, 0, 0, 0.35);
  transition: opacity 0.15s ease;
  ${Thumb}:hover & {
    opacity: 1;
  }
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: left;
`;

const Title = styled.a`
  font-size: 15px;
  font-weight: 700;
  color: var(--ypg-ink);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: var(--ypg-red-dark);
  }
`;

const Meta = styled.span`
  font-size: 12px;
  color: var(--ypg-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

const IconBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 30px;
  padding: 0 10px;
  border: none;
  border-radius: 999px;
  background-color: var(--ypg-chip);
  color: var(--ypg-muted);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: var(--ypg-red-soft);
    color: var(--ypg-red-dark);
  }
`;

interface SongItemProps {
  src: string;
  title: string;
  vid: string;
  channel?: string;
  candidateCount?: number;
  candidateIndex?: number;
  onSwap?: () => void;
  onDelete: () => void;
}

const SongItem = ({
  src,
  title,
  vid,
  channel,
  candidateCount = 1,
  candidateIndex = 0,
  onSwap,
  onDelete,
}: SongItemProps) => {
  const href = `https://www.youtube.com/watch?v=${vid}`;
  return (
    <Wrapper>
      <Thumb target="_blank" rel="noreferrer" href={href}>
        <Img src={src} alt="thumbnail" />
        <Play>▶</Play>
      </Thumb>
      <Info>
        <Title target="_blank" rel="noreferrer" href={href}>
          {title}
        </Title>
        {channel ? <Meta>{channel}</Meta> : null}
      </Info>
      <Actions>
        {candidateCount > 1 && onSwap ? (
          <IconBtn
            type="button"
            onClick={onSwap}
            title="다른 검색 결과로 교체"
          >
            🔄 {candidateIndex + 1}/{candidateCount}
          </IconBtn>
        ) : null}
        <IconBtn type="button" aria-label="삭제" onClick={onDelete}>
          ✕
        </IconBtn>
      </Actions>
    </Wrapper>
  );
};

export default SongItem;
