import React, { useContext, useState } from "react";
import ListModal from "../../components/ListModal/ListModal";
import { UserContext } from "../../store/UserInfoContext";
import "./style.scss";

export default function MakePlaylistPage() {
  const [inputTextField, setInputTextField] = useState("");
  const onChangeTextField = (event) => {
    setInputTextField(event.currentTarget.value);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const buttonClick = () => {
    openModal(true);
  };
  const { accessToken } = useContext(UserContext);
  return (
    <div>
      {accessToken}
      <div className="inputDiv">
        <h1>플레이리스트를 만들고 싶은 곡을 넣어주세요</h1>
        <textarea
          className="inputList"
          placeholder="리스트를 넣어주세요"
          value={inputTextField}
          onChange={onChangeTextField}
        ></textarea>
        <button onClick={buttonClick}>생성</button>
        <ListModal open={modalOpen} close={closeModal} list={inputTextField} />
      </div>
    </div>
  );
}
