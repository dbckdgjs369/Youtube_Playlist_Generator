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
  setCheckValue: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SelectBox({ songList, setCheckValue }: SelectBoxProps) {
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const handleSingleCheck = (checked: boolean, id: string) => {
    console.log(id);
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray = [] as string[];
      songList.forEach((value) => idArray.push(value));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };
  useEffect(() => {
    setCheckValue(checkItems);
  }, [checkItems]);

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
              onChange={(e) => handleSingleCheck(e.target.checked, value)}
              checked={checkItems.includes(value)}
            />
            {value}
          </div>
        )
      )}
    </Wrapper>
  );
}
