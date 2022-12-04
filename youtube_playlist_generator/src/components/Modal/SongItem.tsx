import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  margin: 1rem;
  background-color: #ddd;
  border-radius: 8px;
  gap: 2rem;
  align-items: center;
`;
const Img = styled.img`
  border-radius: 8px;
`;
const Title = styled.span``;

interface SongItemProps {
  src: string;
  title: string;
}

const SongItem = ({ src, title }: SongItemProps) => {
  return (
    <Wrapper>
      <Img src={src} alt="thumbnail" />
      <Title>{title}</Title>
      {/* <span>{description}</span> */}
    </Wrapper>
  );
};

export default SongItem;
