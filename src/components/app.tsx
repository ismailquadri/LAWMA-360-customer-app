import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { Activity, Home, Package, User, Wallet } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import mark from "@/assets/smartwaste-icon.png";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/bins", label: "Bins", icon: Package },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/activity", label: "Activity", icon: Activity },
  { to: "/you", label: "You", icon: User },
] as const;

export function Phone({ children, nav = true }: { children: ReactNode; nav?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { auth, ready } = useStore();
  if (nav && path !== "/" && auth === "signedOut") return <Navigate to="/" />;
  if (nav && path !== "/" && !ready) return <div className="mx-auto min-h-screen max-w-[430px] bg-background" />;
  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-background shadow-xl">
      <main className="ios-stagger flex-1 px-5 pb-28 pt-6" style={{ viewTransitionName: "page" }}>{children}</main>
      {nav && (
        <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[430px] -translate-x-1/2 justify-around border-t bg-card/95 px-2 pb-4 pt-2 backdrop-blur">
          {tabs.map((t) => {
            const on = t.to === "/" ? path === "/" : path.startsWith(t.to);
            return (
              <Link key={t.to} to={t.to} className={cn("flex min-w-14 flex-col items-center gap-1 rounded-xl py-1 text-[11px] font-medium", on ? "text-primary" : "text-muted-foreground")}>
                <t.icon className="size-5" strokeWidth={on ? 2.4 : 1.8} />
                {t.label}
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
  const label = link === "connected" ? "Connected to partner & LAWMA" : link === "offline" ? "Offline — retrying" : "Connecting…";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-border">
      <span className={cn("size-1.5 rounded-full", link === "connected" ? "bg-success" : link === "offline" ? "bg-destructive" : "bg-warning")} />
      {label}
    </span>
  );
}

export const brandMark = mark;
export function Brand() {
  return (
    <div className="flex items-center gap-2">
      <img src={mark} alt="" className="size-7" />
      <span className="text-sm font-semibold tracking-tight">SmartWaste360</span>
    </div>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: string | undefined }) {
  return (
    <header className="mb-5">
      <h1 className="text-[27px] font-bold leading-tight tracking-tight">{title}</h1>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </header>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { tone?: "primary" | "ember" | "light" | "ghost" };
export function Btn({ tone = "primary", className, ...props }: BtnProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        tone === "primary" && "bg-primary text-primary-foreground",
        tone === "ember" && "bg-ember text-ember-foreground",
        tone === "light" && "bg-card text-primary",
        tone === "ghost" && "border border-input bg-card text-foreground hover:bg-muted",
        className,
      )}
    />
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("ios-press rounded-3xl border bg-card p-4", className)}>{children}</div>;
}

export function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="text-sm font-medium leading-none">{label}</span>
      <input {...rest} className="mt-2 flex h-11 w-full rounded-[10px] border border-input bg-card px-3 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring read-only:bg-muted/50" />
    </label>
  );
}

const toneFor: Record<string, string> = {
  Completed: "bg-pale text-accent-foreground", Active: "bg-pale text-accent-foreground", Resolved: "bg-pale text-accent-foreground",
  Declined: "bg-destructive/10 text-destructive", Cancelled: "bg-muted text-muted-foreground",
};
export function Pill({ children }: { children: string }) {
  return <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", toneFor[children] ?? "bg-ember/15 text-ember")}>{children}</span>;
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-3xl border border-dashed p-6 text-center text-sm text-muted-foreground">{children}</p>;
}
