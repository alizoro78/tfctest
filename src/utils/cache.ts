import { CacheData } from '../types/cache.ts';

export class CacheService {
  static set<T>(key: string, data: T, duration: number): void {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }

  static get<T>(key: string, duration: number): T | null {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const cacheData = JSON.parse(cached) as CacheData<T>;
      const isExpired = Date.now() - cacheData.timestamp > duration;

      return isExpired ? null : cacheData.data;
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
      return null;
    }
  }

  static getExpired<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(key);
      return cached ? (JSON.parse(cached) as CacheData<T>).data : null;
    } catch (error) {
      console.warn('Expired cache retrieval failed:', error);
      return null;
    }
  }
}