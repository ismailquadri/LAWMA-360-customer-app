import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { meta } from "@/lib/meta";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import hero from "@/assets/collection.jpg";
import icon from "@/assets/smartwaste-icon.png";

export const Route = createFileRoute("/auth")({
  head: () => meta("Sign in", "Sign in to your SmartWaste360 resident account with Face ID, Apple, Google or email."),
  component: AuthPage,
});

const DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com", "hotmail.com"];

function strength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p) || p.length >= 12) s++;
  return s;
}
const LABELS = ["Too short", "Weak", "Okay", "Good", "Strong"];

function AuthPage() {
  const { auth, demoSignIn } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"up" | "in">("up");
  const [step, setStep] = useState<"email" | "password" | "sent">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const passkeyOk = typeof window !== "undefined" && "PublicKeyCredential" in window;

  useEffect(() => { if (auth === "signedIn") navigate({ to: "/", replace: true }); }, [auth, navigate]);
  useEffect(() => { if (step === "password") pwRef.current?.focus(); }, [step]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const suggestion = useMemo(() => {
    const [u, d] = email.split("@");
    if (!u || d === undefined || DOMAINS.includes(d)) return null;
    const hit = DOMAINS.find((x) => x.startsWith(d) && x !== d);
    return hit ? `${u}@${hit}` : null;
  }, [email]);
  const s = strength(password);

  const enterDemo = () => { demoSignIn(email, mode === "up"); void navigate({ to: "/", replace: true }); };
  const go = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "email") { setStep("password"); return; }
    enterDemo();
  };
  const social = async (_provider: "google" | "apple") => enterDemo();
  const passkey = async () => enterDemo();

  return (
    <div className="min-h-screen bg-muted/40 sm:py-8">
      <div className="relative mx-auto min-h-screen max-w-[430px] overflow-hidden bg-background sm:min-h-[860px] sm:rounded-[36px] sm:shadow-2xl">
        <div className="relative h-64">
          <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/70 to-background" />
          <div className="relative flex h-full flex-col justify-end px-6 pb-8 text-primary-foreground">
            <div className="mb-auto mt-6 flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-card/95 shadow-lg"><img src={icon} alt="" className="h-7 w-7" /></span>
              <span className="text-[15px] font-bold tracking-tight">SmartWaste360</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">{mode === "up" ? "For Lagos homes" : "Good to see you"}</p>
            <h1 className="mt-1 text-[30px] font-bold leading-[1.1] tracking-tight">{mode === "up" ? "Cleaner streets start at your gate." : "Welcome back."}</h1>
          </div>
        </div>

        <div className="relative -mt-4 rounded-t-[28px] bg-background px-6 pb-10 pt-6">
          {step === "sent" ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 py-6 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pale text-3xl">✉️</div>
              <h2 className="mt-4 text-xl font-bold">Check your inbox</h2>
              <p className="mt-2 text-sm text-muted-foreground">We sent a confirmation link to <b className="text-foreground">{email}</b>. Tap it and you'll land straight in your account.</p>
              <button className="mt-6 text-sm font-semibold text-primary" onClick={() => { setStep("email"); setMode("in"); }}>Use a different email</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 rounded-full bg-muted p-1 text-sm font-semibold">
                {(["up", "in"] as const).map((m) => (
                  <button key={m} onClick={() => { setMode(m); setErr(null); }} className={cn("rounded-full py-2.5 transition", mode === m ? "bg-card text-foreground shadow" : "text-muted-foreground")}>{m === "up" ? "New here" : "I have an account"}</button>
                ))}
              </div>

              {passkeyOk && mode === "in" && (
                <button onClick={passkey} disabled={!!busy} className="mt-5 flex w-full items-center gap-3 rounded-2xl bg-primary p-4 text-left text-primary-foreground shadow-lg transition active:scale-[0.99] disabled:opacity-60">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-foreground/15 text-2xl">◉</span>
                  <span className="flex-1"><b className="block text-[15px]">{busy === "passkey" ? "Waiting for Face ID…" : "Sign in with Face ID"}</b><span className="text-xs opacity-80">Or fingerprint / device passkey</span></span>
                  <span className="text-xl">›</span>
                </button>
              )}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <SocialBtn onClick={() => social("apple")} busy={busy === "apple"} label="Apple" glyph={<svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"/></svg>} dark />
                <SocialBtn onClick={() => social("google")} busy={busy === "google"} label="Google" glyph="G" />
              </div>

              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or use email<span className="h-px flex-1 bg-border" /></div>

              <form noValidate onSubmit={go} className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                    {step === "password" && <button type="button" className="text-xs font-medium text-primary hover:underline" onClick={() => setStep("email")}>Change</button>}
                  </div>
                  <input id="email" type="email" inputMode="email" autoComplete="username webauthn" autoCapitalize="none" placeholder="e.g. adaeze@gmail.com" value={email} readOnly={step === "password"} onChange={(e) => setEmail(e.target.value.trim())} className="flex h-11 w-full rounded-[10px] border border-input bg-card px-3 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring read-only:bg-muted/50" autoFocus />
                </div>
                {suggestion && step === "email" && (
                  <button type="button" onClick={() => setEmail(suggestion)} className="text-xs text-muted-foreground">Did you mean <b className="text-primary">{suggestion}</b>?</button>
                )}

                {step === "password" && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 space-y-2">
                    <div className="space-y-2">
                      <label htmlFor="pw" className="text-sm font-medium leading-none">{mode === "up" ? "Create a password" : "Password"}</label>
                      <div className="relative">
                        <input id="pw" ref={pwRef} type={show ? "text" : "password"} autoComplete={mode === "up" ? "new-password" : "current-password"} placeholder="Any password for this demo" value={password} onChange={(e) => setPassword(e.target.value)}  className="flex h-11 w-full rounded-[10px] border border-input bg-card px-3 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring read-only:bg-muted/50 pr-16" />
                        <button type="button" onClick={() => setShow(!show)} className="absolute inset-y-0 right-3 text-xs font-medium text-primary">{show ? "Hide" : "Show"}</button>
                      </div>
                    </div>
                    {false && (
                      <div className="flex items-center gap-2 px-1">
                        <div className="flex flex-1 gap-1">{[1, 2, 3, 4].map((i) => <span key={i} className={cn("h-1.5 flex-1 rounded-full bg-muted transition", s >= i && (s <= 1 ? "bg-destructive" : s === 2 ? "bg-ember" : "bg-success"))} />)}</div>
                        <span className="w-16 text-right text-[11px] text-muted-foreground">{LABELS[s]}</span>
                      </div>
                    )}
                    {mode === "in" && <button type="button" className="px-1 text-xs font-semibold text-primary" onClick={() => setErr("Demo mode: any password works. Continue to sign in.")}>Forgot password?</button>}
                  </div>
                )}

                {err && <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}

                <button type="submit" disabled={false} className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-ember text-sm font-medium text-ember-foreground transition-colors hover:bg-ember/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  {busy === "email" ? "Just a moment…" : step === "email" ? "Continue" : mode === "up" ? "Create my account" : "Sign in"} <span>→</span>
                </button>
              </form>

              <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">Demo mode: use any details. No account is created and no credentials are checked.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SocialBtn({ onClick, busy, label, glyph, dark }: { onClick: () => void; busy: boolean; label: string; glyph: React.ReactNode; dark?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={busy} className={cn("inline-flex h-11 items-center justify-center gap-2 rounded-[10px] text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50", dark ? "bg-foreground text-background hover:bg-foreground/90" : "border border-input bg-card text-foreground hover:bg-muted")}>
      <span className="text-lg font-bold leading-none">{glyph}</span>{busy ? "Opening…" : label}
    </button>
  );
}
