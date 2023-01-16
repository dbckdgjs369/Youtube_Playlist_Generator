import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  margin: 0 1rem;
  min-width: 60%;
  padding-right: 1rem;
  background-color: ghostwhite;
  border-radius: 8px;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
`;
const Img = styled.img`
  border-radius: 8px;
`;
const Title = styled.a`
  font-size: large;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface SongItemProps {
  src: string;
  title: string;
  vid: string;
  setDeleteId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SongItem = ({ src, title, vid, setDeleteId }: SongItemProps) => {
  return (
    <Wrapper>
      <Img src={src} alt="thumbnail" />
      <Title target="_blank" href={`https://www.youtube.com/watch?v=${vid}`}>
        {title}
      </Title>
      <img
        src="./images/x.svg"
        alt="cancel"
        onClick={() => setDeleteId(vid)}
      ></img>
    </Wrapper>
  );
};

export default SongItem;
