// const makeList = (songList: string[]) => {
//   return songList.map((value: string) =>
//     value
//       .replace(/ *(\s{0,})([0-5][0-9]):([0-5][0-9])(:[0-5][0-9])*/g, "")
//       .trim()
//   );
// };
const makeList = (songList: string[]) => {
  return songList.map((value) => value.split(" ").slice(1).join(""));
};

export { makeList };
