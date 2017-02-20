export type TChannel = {
  status: string; // active, inactive
  rank: number;
  score: number;
  likeCount: number;
  cseSearchQuery?: string;
  youtube: {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    banner: string;
    subscriberCount: number;
    viewCount: number;
  };
  twitter?: {
    screen_name: string;
    followersCount: number;
  };
}
