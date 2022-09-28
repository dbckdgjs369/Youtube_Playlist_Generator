import styled from "@emotion/styled";

const Loader = styled.span`
  display: flex;
  position: absolute;
  width: 70px;
  height: 70px;
  border: 5px solid #ddd;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default function Loading() {
  return <Loader />;
}
