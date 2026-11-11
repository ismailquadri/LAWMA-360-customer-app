import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Wraps the mobile customer app in a studio smartphone chassis on tablet/desktop viewports (>= 480px)
 * while preserving native edge-to-edge full-screen presentation on physical phones (< 480px).
 */
export function MockupFrame({ children }: { children: ReactNode }) {
  const { ready, introDone } = useStore();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const darkStatus = path === "/" && (!ready || !introDone);

  return (
    <div className="mockup-stage">
      <div className="mockup-chassis">
        {/* Decorative hardware buttons (desktop/tablet presentation only) */}
        <span aria-hidden="true" className="mockup-btn-silent hidden min-[480px]:block" />
        <span aria-hidden="true" className="mockup-btn-vol-up hidden min-[480px]:block" />
        <span aria-hidden="true" className="mockup-btn-vol-down hidden min-[480px]:block" />
        <span aria-hidden="true" className="mockup-btn-power hidden min-[480px]:block" />

        <div className="mockup-screen-shell">
          {/* Simulated iOS status bar + Dynamic Island on framed viewports */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 z-40 hidden h-[48px] items-center justify-between px-7 pt-1 text-[13px] font-semibold tracking-tight transition-colors duration-300 min-[480px]:flex",
              darkStatus ? "bg-transparent text-white" : "bg-[#f2f3f7]/85 text-foreground backdrop-blur-md",
            )}
          >
            <span className="w-12 tabular-nums">9:41</span>

            {/* Dynamic Island */}
            <div className="flex h-[27px] w-[102px] items-center justify-end rounded-full bg-black px-2.5 shadow-inner ring-1 ring-white/10">
              <span className="size-2.5 rounded-full bg-[#151a2e] ring-1 ring-white/10" />
            </div>

            {/* Signal, Wi-Fi, Battery */}
            <div className="flex w-12 items-center justify-end gap-1.5">
              <svg viewBox="0 0 16 11" className="h-[10px] w-[14px] fill-current">
                <rect x="0" y="7" width="2.5" height="4" rx="0.7" />
                <rect x="4.2" y="5" width="2.5" height="6" rx="0.7" />
                <rect x="8.4" y="2.5" width="2.5" height="8.5" rx="0.7" />
                <rect x="12.6" y="0" width="2.5" height="11" rx="0.7" />
              </svg>
              <svg viewBox="0 0 15 11" className="h-[10px] w-[13px] fill-current">
                <path d="M7.5 8.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm-3.6-2.2a5.2 5.2 0 0 1 7.2 0 .75.75 0 0 1-1.06 1.06 3.7 3.7 0 0 0-5.08 0A.75.75 0 0 1 3.9 6.6Zm-2.7-2.7a9 9 0 0 1 12.6 0 .75.75 0 0 1-1.06 1.06 7.5 7.5 0 0 0-10.48 0A.75.75 0 1 1 1.2 3.9Z" />
              </svg>
              <div className="flex items-center gap-[1px]">
                <div className="flex h-[10px] w-[20px] items-center rounded-[3px] border border-current/60 p-[1.5px]">
                  <div className="h-full w-full rounded-[1.2px] bg-current" />
                </div>
                <div className="h-[4px] w-[1.5px] rounded-r-[1px] bg-current/60" />
              </div>
            </div>
          </div>

          {/* Scroll container isolating inner viewport from outer page */}
          <div className="mockup-scroll">{children}</div>

          {/* Bottom iOS Home Indicator */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-40 hidden h-5 items-center justify-center pb-1.5 min-[480px]:flex"
          >
            <span
              className={cn(
                "h-[4px] w-[132px] rounded-full transition-colors duration-300",
                darkStatus ? "bg-white/45" : "bg-foreground/25",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
