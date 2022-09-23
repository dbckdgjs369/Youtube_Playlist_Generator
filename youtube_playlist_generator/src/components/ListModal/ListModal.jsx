import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import Authorize from "../Authorize/Authorize";
import "./style.scss";

axios.defaults.baseURL = `https://www.googleapis.com/youtube/v3`;

export default function ListModal(props) {
  const { open, close } = props;
  const [checkedList, setCheckedLists] = useState([]);
  const [songList, setSongList] = useState([]);
  const makeList = (songList) => {
    return songList.map((v) =>
      v.replace(/([0-5][0-9]):([0-5][0-9])(:[0-5][0-9])*/gi, " ").trim()
    );
  };

  useEffect(() => {
    setSongList(makeList(props.list.split("\n")));
  }, [props.list]);

  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];

        songList.forEach((list) =>
          list.length !== 0 ? checkedListArray.push(list) : null
        );

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
      } else {
        setCheckedLists(checkedList.filter((el) => el !== value));
      }
    },
    [checkedList]
  );

  const [songIdList, setSongIdList] = useState([]);
  const [query, setQuery] = useState("");
  const [params, setParams] = useState({
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: "snippet",
    q: `${query}`,
    maxResults: 1,
    type: "video",
  });

  async function getSearchResult(checkedList) {
    const temp = [];
    checkedList.forEach(async (song) => {
      params.q = song;
      const t = await axios //이게 진짜 코드
        .get("/search", {
          params,
        })
        .then((res) => temp.push(res.data.items[0].id.videoId));
    });
    setSongIdList(temp);
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
            <br />
            <button
              className="createBtn"
              onClick={() => getSearchResult(checkedList)}
            >
              Get Viedo IDs
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
