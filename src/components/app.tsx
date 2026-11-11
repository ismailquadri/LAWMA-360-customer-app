import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { Activity, Home, Package, User, Wallet } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import mark from "@/assets/smartwaste-icon.png";
import {
  IosBadge,
  IosButton,
  IosEmpty,
  IosField,
  type IosButtonTone,
} from "./ios";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/bins", label: "Bins", icon: Package },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/activity", label: "Activity", icon: Activity },
  { to: "/you", label: "You", icon: User },
] as const;

export function Phone({ children, nav = true }: { children: ReactNode; nav?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { isOnboarded, ready } = useStore();
  if (nav && path !== "/" && !ready) return <div className="mx-auto min-h-screen max-w-[430px] bg-background" />;
  if (nav && path !== "/" && !isOnboarded) return <Navigate to="/" />;
  return (
    <div className="app-phone mx-auto flex min-h-screen max-w-[430px] flex-col bg-background">
      <main className="ios-stagger flex-1 px-4 pb-28 pt-5" style={{ viewTransitionName: "page" }}>
        {children}
      </main>
      {nav && (
        <nav
          aria-label="Primary tabs"
          className="app-tabbar fixed bottom-0 left-1/2 z-20 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 px-1 pt-1.5 pb-3"
        >
          {tabs.map((t) => {
            const on = t.to === "/" ? path === "/" : path.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex min-h-[46px] flex-col items-center justify-center gap-0.5 rounded-[10px] py-1 text-[10.5px] tracking-[-0.01em] transition-colors",
                  on ? "font-semibold text-primary" : "font-medium text-muted-foreground hover:text-foreground",
                )}
              >
                <t.icon className="size-[22px]" strokeWidth={on ? 2.25 : 1.7} aria-hidden="true" />
                <span>{t.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export function LinkStatus() {
  const { link } = useStore();
  const label =
    link === "demo"
      ? "On-device"
      : link === "connected"
        ? "Connected"
        : link === "offline"
          ? "Offline"
          : "Connecting…";
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-[12px] font-medium text-muted-foreground ring-1 ring-black/[0.07]">
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          link === "connected" || link === "demo" ? "bg-[#248a3d]" : link === "offline" ? "bg-destructive" : "bg-warning",
        )}
      />
      {label}
    </span>
  );
}

export const brandMark = mark;

export function Brand() {
  return (
    <div className="flex items-center gap-2">
      <img src={mark} alt="" className="size-7 rounded-[7px]" />
      <span className="text-[15px] font-semibold tracking-[-0.02em]">SmartWaste360</span>
    </div>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: string | undefined }) {
  return (
    <header className="mb-5 px-0.5">
      <h1 className="text-[34px] font-bold leading-[1.12] tracking-[-0.025em] text-foreground">{title}</h1>
      {sub && <p className="mt-1 text-[15px] leading-[20px] text-muted-foreground">{sub}</p>}
    </header>
  );
}

export function Btn({
  tone = "primary",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: IosButtonTone | undefined }) {
  return <IosButton tone={tone} type={type} {...props} />;
}

export function Card({ className, children }: { className?: string | undefined; children: ReactNode }) {
  return <div className={cn("ios-card p-4", className)}>{children}</div>;
}

export function Field(props: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string | undefined }) {
  return (
    <div className="ios-group">
      <IosField {...props} />
    </div>
  );
}

export function Pill({ children }: { children: string }) {
  return <IosBadge>{children}</IosBadge>;
}

export function Empty({
  icon,
  title,
  children,
}: {
  icon?: ReactNode | undefined;
  title?: string | undefined;
  children: ReactNode;
}) {
  return (
    <IosEmpty icon={icon} title={title}>
      {children}
    </IosEmpty>
  );
}
