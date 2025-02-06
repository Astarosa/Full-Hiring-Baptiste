import { useState, useCallback } from 'react';

interface RateLimitState {
  isRateLimited: boolean;
  resetTime: number | null;
  error: string | null;
  loading: boolean;
  fetchWithRateLimit: <T>(url: string, options?: RequestInit) => Promise<T>;
}

const useRateLimitedFetch = (): RateLimitState => {
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [resetTime, setResetTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const fetchWithRateLimit = useCallback(async <T,>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> => {

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (!baseUrl) {
      throw new Error('API base URL is not defined');
    }
  
    const url = `${baseUrl}${endpoint}`;

    if (isRateLimited) {
      const remainingTime = resetTime ? resetTime - Date.now() : 0;
      throw new Error(`Rate limited. Try again in ${Math.ceil(remainingTime / 1000)} seconds`);
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      
      const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
      const rateLimitReset = response.headers.get('X-RateLimit-Reset');

      if (rateLimitRemaining === '0' && rateLimitReset) {
        setIsRateLimited(true);
        const resetTimeMs = parseInt(rateLimitReset) * 1000;
        setResetTime(resetTimeMs);
        setTimeout(() => {
          setIsRateLimited(false);
          setResetTime(null);
        }, resetTimeMs - Date.now());
      }

      if (!response.ok) {
        throw new Error(`HTTP error ! status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [isRateLimited, resetTime]);

  return {
    fetchWithRateLimit,
    isRateLimited,
    resetTime,
    error,
    loading
  };
};

export default useRateLimitedFetch;