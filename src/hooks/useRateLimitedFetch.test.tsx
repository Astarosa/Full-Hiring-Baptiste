import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useRateLimitedFetch from './useRateLimitedFetch';

describe('useRateLimitedFetch', () => {
  global.fetch = vi.fn();

  beforeEach(() => {
    global.fetch.mockClear();
  });

  it('should fetch data successfully', async () => {
    const mockResponse = { data: 'test data' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      headers: {
        get: () => '10',
      },
    });

    const { result } = renderHook(() => useRateLimitedFetch());

    await act(async () => {
      const data = await result.current.fetchWithRateLimit('/test-endpoint');
      expect(data).toEqual(mockResponse);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle rate limiting', async () => {
    interface MockResponse {
      ok: boolean;
      json: () => Promise<unknown>;
      headers: {
        get: (header: string) => string | null;
      };
    }

    const mockResponse: MockResponse = {
      ok: true,
      json: async () => ({}),
      headers: {
        get: (header: string) => {
          if (header === 'X-RateLimit-Remaining') return '0';
          if (header === 'X-RateLimit-Reset') return `${Math.floor(Date.now() / 1000) + 1}`;
          return null;
        },
      },
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useRateLimitedFetch());

    await act(async () => {
      try {
        await result.current.fetchWithRateLimit('/test-endpoint');
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toContain('Rate limited');
        }
      }
    });

    expect(result.current.isRateLimited).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('should handle fetch errors', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
      headers: {
        get: () => '10',
      },
    });

    const { result } = renderHook(() => useRateLimitedFetch());

    await act(async () => {
      try {
        await result.current.fetchWithRateLimit('/test-endpoint');
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toContain('HTTP error ! status: 500');
        }
      }
    });

    expect(result.current.error).toBe('HTTP error ! status: 500');
    expect(result.current.loading).toBe(false);
  });
});