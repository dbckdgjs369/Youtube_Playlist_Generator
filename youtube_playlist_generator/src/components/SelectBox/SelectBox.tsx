import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { text } from "styles/theme";

const Wrapper = styled.div`
  border: 1px solid;
  width: 400px;
  height: 400px;
  border-radius: 8px;
  padding: 20px;
  overflow: auto;
  overflow-x: hidden;
  line-height: 1.5rem;
`;

const RowElement = styled.div`
  display: flex;
`;

const StyledLabel = styled.label`
  ${text.$body1}
`;

interface SelectBoxProps {
  songList: string[];
  setCheckValue?: string[];
}

export default function SelectBox({ songList, setCheckValue }: SelectBoxProps) {
  const [checkItems, setCheckItems] = useState<number[]>([]);
  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray = [] as number[];
      songList.forEach((_, index) => idArray.push(index));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <Wrapper>
      {songList.length !== 0 ? (
        <RowElement>
          <input
            type="checkbox"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={checkItems.length === songList.length}
          />
          <StyledLabel>
            전체 선택 ( {checkItems.length} / {songList.length} )
          </StyledLabel>
        </RowElement>
      ) : null}
      {songList.map((value, index) =>
        !value ? (
          <div key={index}></div>
        ) : (
          <div key={index}>
            <input
              type="checkbox"
              onChange={(e) => handleSingleCheck(e.target.checked, index)}
              checked={checkItems.includes(index)}
            />
            {value}
          </div>
        )
      )}
    </Wrapper>
  );
}
