type VideoInfo = {
  kind: "youtube#searchListResponse";
  etag: "9FM6D7uLfWa0rv-TAYGrqlG9IqE";
  nextPageToken: "CAEQAA";
  regionCode: "KR";
  pageInfo: {
    totalResults: 1000000;
    resultsPerPage: 1;
  };
  items: [
    {
      kind: "youtube#searchResult";
      etag: "KK6FVSJX7mGZrqI3d2gb9WgPgJA";
      id: {
        kind: "youtube#video";
        videoId: "pC7Z0TnvIs0";
      };
      snippet: {
        publishedAt: "2021-06-01T06:54:19Z";
        channelId: "UCeYzCeywt-0vT-lReSNxK0Q";
        title: "JOY (조이) – Hello (안녕) Lyrics (Color Coded Han/Rom/Eng)";
        description: "Artist: JOY (조이) Song: Hello (안녕) Album: 'Hello' Solo Debut Special Album Lyrics: ColorCodedLyrics (from ...";
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/pC7Z0TnvIs0/default.jpg";
            width: 120;
            height: 90;
          };
          medium: {
            url: "https://i.ytimg.com/vi/pC7Z0TnvIs0/mqdefault.jpg";
            width: 320;
            height: 180;
          };
          high: {
            url: "https://i.ytimg.com/vi/pC7Z0TnvIs0/hqdefault.jpg";
            width: 480;
            height: 360;
          };
        };
        channelTitle: "lovelyeonwoo";
        liveBroadcastContent: "none";
        publishTime: "2021-06-01T06:54:19Z";
      };
    }
  ];
};

export type { VideoInfo };
