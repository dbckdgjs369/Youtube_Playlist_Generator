import React, { useState } from "react";
import ListModal from "../../components/ListModal/ListModal";
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
  const makeList = (songs) => {
    let line = songs.split("\n");
    const searchArr = line.map((v) =>
      v.replace(/([0-5][0-9]):([0-5][0-9])(:[0-5][0-9])*/gi, " ").trim()
    );

    return searchArr;
  };

  const buttonClick = () => {
    openModal(true);
  };
  return (
    <div>
      <div className="inputDiv">
        <span>플레이리스트를 만들고 싶은 곡을 넣어주세요</span>
        <textarea
          className="inputList"
          placeholder="리스트를 넣어주세요"
          value={inputTextField}
          onChange={onChangeTextField}
        ></textarea>
        <button onClick={buttonClick}>생성</button>
        <ListModal open={modalOpen} close={closeModal}>
          {makeList(inputTextField).map((v) =>
            !v ? (
              <div></div>
            ) : (
              <div>
                <input type="checkbox" />
                {v}
              </div>
            )
          )}
        </ListModal>
      </div>
    </div>
  );
}
