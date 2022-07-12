import React, { useCallback, useState } from "react";
import axios from "axios";
import Authorize from "../Authorize/Authorize";
import "./style.scss";

axios.defaults.baseURL = `https://www.googleapis.com/youtube/v3`;
const API_END_POINT = "https://accounts.google.com/o/oauth2/auth";
const REDIRECT_URI = "http://localhost:3000";
const SCOPE = "https://www.googleapis.com/auth/youtube";
const url = `${API_END_POINT}?access_type=offline&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;

export default function ListModal(props) {
  const { open, close } = props;
  const [checkedList, setCheckedLists] = useState([]);
  const songList = props.list.split("\n");
  // 전체 체크 클릭 시 발생하는 함수
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];

        songList.forEach((list) => checkedListArray.push(list));
        console.log(checkedListArray);

        setCheckedLists(checkedListArray);
      } else {
        setCheckedLists([]);
      }
    },
    [songList]
  );

  const onCheckedElement = useCallback(
    (checked, value) => {
      if (checked) {
        setCheckedLists([...checkedList, value]);
        console.log(checkedList);
      } else {
        setCheckedLists(checkedList.filter((el) => el !== value));
      }
    },
    [checkedList]
  );

  const makeList = (songList) => {
    const searchArr = songList.map((v) =>
      v.replace(/([0-5][0-9]):([0-5][0-9])(:[0-5][0-9])*/gi, " ").trim()
    );

    return searchArr;
  };

  const [songIdList, setSongIdList] = useState([]);
  const [query, setQuery] = useState("");
  const [params, setParams] = useState({
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: "snippet",
    q: `${query}`,
    maxResults: 1,
    type: "video",
  });

  async function getSearchResult() {
    const temp = [];
    songList.forEach(async (song) => {
      params.q = song;
      console.log(params);
      await axios
        .get("/search", {
          params,
        })
        .then((res) => temp.push(res.data.items[0].id.videoId));
    });
    setSongIdList(await temp);
    console.log(songIdList);
  }

  return (
    <div className={open ? "openedModal" : "modal"}>
      {open ? (
        <div className="modalBox">
          <header>
            <button className="close" onClick={close}>
              close
            </button>
          </header>
          <div className="songListDiv">
            <input
              type="checkbox"
              onChange={(e) => onCheckedAll(e.target.checked)}
              checked={
                checkedList.length === 0
                  ? false
                  : checkedList.length === songList.length
                  ? true
                  : false
              }
            />
            {makeList(songList).map((value, index) =>
              !value ? (
                <div key={index}></div>
              ) : (
                <div key={index}>
                  <input
                    type="checkbox"
                    onChange={(e) => onCheckedElement(e.target.checked, value)}
                    checked={checkedList.includes(value) ? true : false}
                  />
                  {value}
                </div>
              )
            )}
          </div>
          <div>
            <a href={url}>
              <button>login</button>
            </a>
            <br />
            <button className="createBtn" onClick={() => getSearchResult()}>
              Create API List!
            </button>
          </div>
          <div>
            <Authorize songIdList={songIdList} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
