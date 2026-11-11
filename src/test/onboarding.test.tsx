import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { StoreProvider, useStore } from "@/lib/store";

const wrapper = ({ children }: { children: ReactNode }) => <StoreProvider>{children}</StoreProvider>;

describe("login-free onboarding flow", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("walks straight from intro through 3-step onboarding without sign-in", () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    expect(result.current.ready).toBe(true);
    expect(result.current.introDone).toBe(false);
    expect(result.current.isOnboarded).toBe(false);
    expect(result.current.model.balance).toBe(7500);

    act(() => result.current.completeIntro());
    expect(result.current.introDone).toBe(true);
    expect(result.current.isOnboarded).toBe(false);

    act(() => result.current.start("Adaeze Okafor", "0803 000 0000"));
    expect(result.current.model.name).toBe("Adaeze Okafor");
    expect(result.current.isOnboarded).toBe(false);

    act(() => result.current.choosePremise("HOME-018"));
    expect(result.current.model.premiseId).toBe("HOME-018");
    expect(result.current.isOnboarded).toBe(false);

    act(() => result.current.choosePartner("PAR-001"));
    expect(result.current.model.partnerId).toBe("PAR-001");
    expect(result.current.isOnboarded).toBe(true);
  });

  it("resets back to the beginning of onboarding cleanly", () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    act(() => {
      result.current.completeIntro();
      result.current.start("Adaeze Okafor", "0803 000 0000");
      result.current.choosePremise("HOME-018");
      result.current.choosePartner("PAR-001");
    });
    expect(result.current.isOnboarded).toBe(true);

    act(() => result.current.reset());
    expect(result.current.introDone).toBe(false);
    expect(result.current.isOnboarded).toBe(false);
    expect(result.current.model.name).toBe("");
    expect(result.current.model.balance).toBe(7500);
  });
});
