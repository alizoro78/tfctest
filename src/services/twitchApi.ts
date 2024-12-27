import { STREAMERS } from '../config/constants';
import { CACHE_CONFIG } from '../config/cache';
import { TwitchAPI } from './api';
import { CacheService } from '../utils/cache';
import type { TwitchStream, TwitchUserResponse, TwitchStreamResponse } from '../types/twitch';

export class StreamerService {
  static async getStreamerInfo(username: string, accessToken: string) {
    const data = await TwitchAPI.fetchTwitchAPI<TwitchUserResponse>(
      `users?login=${username}`,
      accessToken
    );
    return data.data[0];
  }

  static async getStreamerStreamInfo(username: string, accessToken: string) {
    const data = await TwitchAPI.fetchTwitchAPI<TwitchStreamResponse>(
      `streams?user_login=${username}`,
      accessToken
    );
    return data.data[0] || null;
  }

  static async fetchAllStreamers(): Promise<TwitchStream[]> {
    const cachedData = CacheService.get<TwitchStream[]>(
      CACHE_CONFIG.STREAMS_KEY,
      CACHE_CONFIG.DURATION
    );
    if (cachedData) return cachedData;

    try {
      const accessToken = await TwitchAPI.getAccessToken();
      const streamsData: TwitchStream[] = [];

      await Promise.all(
        STREAMERS.map(async (streamer) => {
          try {
            const streamerInfo = await this.getStreamerInfo(streamer, accessToken);
            if (!streamerInfo) return;

            const streamInfo = await this.getStreamerStreamInfo(streamer, accessToken);
            if (!streamInfo) return;

            // Use smaller thumbnail dimensions for better performance
            const optimizedThumbnail = streamInfo.thumbnail_url
              .replace("{width}", "320")  // Reduced from 640
              .replace("{height}", "180"); // Reduced from 360

            // Get smaller profile image by modifying the URL
            const optimizedProfileImage = streamerInfo.profile_image_url.replace('300x300', '70x70');

            streamsData.push({
              displayName: streamerInfo.display_name,
              login: streamerInfo.login,
              profileImage: optimizedProfileImage,
              isLive: true,
              gameName: streamInfo.game_name,
              title: streamInfo.title,
              viewersCount: streamInfo.viewer_count,
              thumbnailUrl: optimizedThumbnail,
              startedAt: streamInfo.started_at
            });
          } catch (error) {
            console.warn(`Failed to fetch data for streamer ${streamer}:`, error);
          }
        })
      );

      const sortedData = streamsData.sort((a, b) => b.viewersCount - a.viewersCount);
      CacheService.set(CACHE_CONFIG.STREAMS_KEY, sortedData, CACHE_CONFIG.DURATION);
      return sortedData;
    } catch (error) {
      const expiredData = CacheService.getExpired<TwitchStream[]>(CACHE_CONFIG.STREAMS_KEY);
      if (expiredData) return expiredData;
      throw error;
    }
  }
}