import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from '../config/constants';
import type { TwitchAuthResponse } from '../types/twitch';

export class TwitchAPI {
  private static async fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response;
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    throw new Error('All retry attempts failed');
  }

  static async getAccessToken(): Promise<string> {
    const response = await this.fetchWithRetry(
      'https://id.twitch.tv/oauth2/token',
      {
        method: 'POST',
        body: new URLSearchParams({
          client_id: TWITCH_CLIENT_ID,
          client_secret: TWITCH_CLIENT_SECRET,
          grant_type: 'client_credentials'
        }),
      }
    );
    const data: TwitchAuthResponse = await response.json();
    return data.access_token;
  }

  static async fetchTwitchAPI<T>(endpoint: string, accessToken: string): Promise<T> {
    const response = await this.fetchWithRetry(
      `https://api.twitch.tv/helix/${endpoint}`,
      {
        headers: {
          'Client-ID': TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    return response.json();
  }
}