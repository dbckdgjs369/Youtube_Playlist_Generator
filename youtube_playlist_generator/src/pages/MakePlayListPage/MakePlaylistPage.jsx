import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import ListModal from "../../components/ListModal/ListModal";
import { UserContext } from "../../store/UserInfoContext";
import styled from "@emotion/styled";

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputList = styled.textarea`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 500px;
  height: 500px;
  border-radius: 10px;
  padding: 20px;
`;

export default function MakePlaylistPage() {
  const [inputTextField, setInputTextField] = useState("");
  const [authorization_code, setAuthorization_code] = useState("");
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
  const { accessToken, setAccessToken } = useContext(UserContext);
  // const [accessToken, setAccessToken] = useState("");
  const REDIRECT_URI = "http://localhost:3000/create";
  async function getAccessToken() {
    console.log("inside");
    const token = axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: authorization_code,
      grant_type: "authorization_code",
    });
    setAccessToken((await token).data.access_token);
    console.log(authorization_code);
    console.log(accessToken);
  }
  useEffect(() => {
    const auth = new URLSearchParams(window.location.search).get("code");
    setAuthorization_code(auth);
    console.log(authorization_code);
    window.history.pushState("", "createPage", "/create");
  }, []);
  useEffect(() => {
    getAccessToken();
    console.log(accessToken);
  }, [authorization_code]);

  return (
    <div>
      <div>
        36:45 Rainbow Halo - 레드벨벳
        <br /> 40:09 SMILEY (Ft. 비비) - 예나
      </div>
      <InputDiv>
        <h1>플레이리스트를 만들고 싶은 곡을 넣어주세요</h1>
        <InputList
          placeholder="리스트를 넣어주세요"
          value={inputTextField}
          onChange={onChangeTextField}
        />
        <li>a</li>
        <button onClick={buttonClick}>생성</button>
        <ListModal open={modalOpen} close={closeModal} list={inputTextField} />
      </InputDiv>
    </div>
  );
}
