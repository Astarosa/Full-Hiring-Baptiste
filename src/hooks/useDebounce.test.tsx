import { renderHook, act } from "@testing-library/react";
import useDebounce from "../hooks/useDebounce";
import { vi, describe, expect, it } from "vitest";

vi.useFakeTimers();

describe("useDebounce", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("should not update the value immediately", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: "initial" },
    });

    rerender({ value: "new value" });

    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(result.current).toBe("initial");
  });

  it("should update the value after the delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: "initial" },
    });

    rerender({ value: "new value" });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("new value");
  });

  it("should reset the timer if the value changes before the delay ends", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: "initial" },
    });

    rerender({ value: "new value" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender({ value: "another value" });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("another value");
  });

  it("should clean up the timeout when unmounted", () => {
    const { unmount } = renderHook(() => useDebounce("test", 500));

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
