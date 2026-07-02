type Thumbnail = { url: string; width?: number; height?: number };

type SearchItem = {
  kind?: string;
  etag?: string;
  id: {
    kind?: string;
    videoId: string;
  };
  snippet: {
    publishedAt?: string;
    channelId?: string;
    title: string;
    description?: string;
    thumbnails: {
      default: Thumbnail;
      medium?: Thumbnail;
      high?: Thumbnail;
    };
    channelTitle?: string;
    liveBroadcastContent?: string;
    publishTime?: string;
  };
};

type VideoInfo = {
  kind?: string;
  etag?: string;
  nextPageToken?: string;
  regionCode?: string;
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SearchItem[];
};

export type { VideoInfo, SearchItem };
