import { vi, describe, it, expect, beforeEach, afterEach,  } from 'vitest'
import { epochToFormattedTime, formattedDateToEpoch } from './DateHelper'

describe('Time conversion functions', () => {
  describe('epochToFormattedTime', () => {
    it('should convert epoch timestamp to formatted time string', () => {
      const mockDate = new Date('2024-03-06T16:45:13');
      const epoch = Math.floor(mockDate.getTime() / 1000);
      const result = epochToFormattedTime(epoch);
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('should handle specific time correctly', () => {
      const mockDate = new Date('2024-03-06T15:30:00');
      const epoch = Math.floor(mockDate.getTime() / 1000);
      const result = epochToFormattedTime(epoch);
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('should format time in 24-hour format', () => {
      const mockDate = new Date('2024-03-06T13:45:13');
      const epoch = Math.floor(mockDate.getTime() / 1000);
      const result = epochToFormattedTime(epoch);
      expect(result).toMatch(/^(?:[0-1]\d|2[0-3]):\d{2}:\d{2}$/);
    });
  });

  describe('formattedDateToEpoch', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 2, 6, 12, 0, 0));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should calculate correct epoch difference for future date', () => {
      const futureDate = new Date(2024, 2, 6, 13, 0, 0).getTime();
      const result = formattedDateToEpoch(futureDate);
      expect(result).toBe(3600);
    });

    it('should calculate correct epoch difference for past date', () => {
      const pastDate = new Date(2024, 2, 6, 11, 0, 0).getTime();
      const result = formattedDateToEpoch(pastDate);
      expect(result).toBe(-3600);
    });

    it('should round up to the nearest second', () => {
      const futureDate = new Date(2024, 2, 6, 12, 0, 0, 500).getTime();
      const result = formattedDateToEpoch(futureDate);
      expect(result).toBe(1);
    });
  });
});