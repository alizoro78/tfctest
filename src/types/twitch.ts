export interface TwitchStream {
  displayName: string;
  login: string;
  profileImage: string;
  isLive: boolean;
  gameName: string;
  title?: string;
  viewersCount: number;
  thumbnailUrl?: string;
  startedAt?: string;
}

export interface TwitchAuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface TwitchUserResponse {
  data: Array<{
    id: string;
    login: string;
    display_name: string;
    profile_image_url: string;
  }>;
}

export interface TwitchStreamResponse {
  data: Array<{
    user_login: string;
    game_name: string;
    title: string;
    viewer_count: number;
    thumbnail_url: string;
    started_at: string;
  }>;
}