import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  border: 1.5px solid var(--ypg-border);
  width: 100%;
  height: 380px;
  border-radius: 16px;
  padding: 8px;
  overflow: auto;
  overflow-x: hidden;
  background-color: var(--ypg-input);

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--ypg-border);
    border-radius: 8px;
  }
`;

const AllRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-bottom: 4px;
  border-radius: 12px;
  background-color: var(--ypg-card-solid);
  border: 1px solid var(--ypg-border);
  font-size: 14px;
  font-weight: 700;
  color: var(--ypg-ink);
  cursor: pointer;
  position: sticky;
  top: 0;
`;

const Row = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 15px;
  color: var(--ypg-sub);
  cursor: pointer;
  transition: background-color 0.12s ease;

  &:hover {
    background-color: var(--ypg-row-hover);
  }
`;

const Check = styled.input`
  width: 17px;
  height: 17px;
  accent-color: #ff0033;
  cursor: pointer;
  flex-shrink: 0;
`;

const Empty = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--ypg-faint);
  font-size: 14px;
  text-align: center;
`;

interface SelectBoxProps {
  songList: string[];
  setCheckValue: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SelectBox({ songList, setCheckValue }: SelectBoxProps) {
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const handleSingleCheck = (checked: boolean, id: string) => {
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
  }, [checkItems, setCheckValue]);

  return (
    <Wrapper>
      {songList.length !== 0 ? (
        <AllRow>
          <Check
            type="checkbox"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={checkItems.length === songList.length}
          />
          전체 선택 ( {checkItems.length} / {songList.length} )
        </AllRow>
      ) : (
        <Empty>
          <span style={{ fontSize: "28px" }}>🎧</span>
          <span>
            타임라인을 입력하고 <b>리스트 생성</b>을 눌러주세요
          </span>
        </Empty>
      )}
      {songList.map((value, index) =>
        !value ? (
          <div key={index}></div>
        ) : (
          <Row key={index}>
            <Check
              type="checkbox"
              onChange={(e) => handleSingleCheck(e.target.checked, value)}
              checked={checkItems.includes(value)}
            />
            {value}
          </Row>
        )
      )}
    </Wrapper>
  );
}
