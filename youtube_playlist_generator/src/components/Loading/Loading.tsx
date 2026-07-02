import styled from "@emotion/styled";

const Loader = styled.span`
  width: 56px;
  height: 56px;
  margin: 12px auto;
  border: 5px solid #ffe0e7;
  border-bottom-color: #ff0033;
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
