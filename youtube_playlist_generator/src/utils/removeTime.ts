const makeList = (songList: string[]) => {
  return songList.map((value: string) =>
    value.replace(/([0-5][0-9]):([0-5][0-9])(:[0-5][0-9])*/gi, " ").trim()
  );
};

export { makeList };
