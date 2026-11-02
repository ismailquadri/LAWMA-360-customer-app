import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { brandMark, Btn, Card, Field, LinkStatus, Phone } from "@/components/app";
import wordmark from "@/assets/smartwaste360-white.svg";
import dawnImg from "@/assets/before-dawn.jpg";
import { money, OPEN_PICKUP, partners, premises } from "@/lib/customer-model";
import { meta } from "@/lib/meta";
import { useStore } from "@/lib/store";
import deliveryImg from "@/assets/delivery.jpg";
import collectionImg from "@/assets/collection.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => meta("Home", "Your LAWMA 360 home: smart bins, pickups and your collection partner in one place."),
  component: Index,
});

function Index() {
  const { auth, ready, model } = useStore();
  if (auth === "signedOut") return <Intro />;
  if (auth === "loading" || !ready) return <Splash />;
  if (!model.name) return <Profile />;
  if (!model.premiseId) return <Address />;
  if (!model.partnerId) return <ChoosePartner />;
  return <Home />;
}

function Splash() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col items-center justify-center gap-4 bg-primary text-primary-foreground">
      <img src={brandMark} alt="" className="size-20 animate-pulse" />
      <img src={wordmark} alt="SmartWaste360" className="h-9" />
    </div>
  );
}

const slides = [
  { img: dawnImg, eyebrow: "Before SmartWaste360", title: "No more waiting for the truck at dawn.", body: "Book a pickup that fits your day and see exactly when your crew is coming." },
  { img: deliveryImg, eyebrow: "Smart bins", title: "Bins delivered to your door.", body: "Your licensed partner brings and services the right bins for your home." },
  { img: collectionImg, eyebrow: "One line to LAWMA", title: "Report a problem in seconds.", body: "Describe it in your own words — we write it up clearly and send it to the right people." },
];

function Intro() {
  const [i, setI] = useState(0);
  const s = slides[i]!;
  const last = i === slides.length - 1;
  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-primary text-primary-foreground">
      <div className="relative flex-1 overflow-hidden">
        <img key={s.img} src={s.img} alt="" className="absolute inset-0 size-full object-cover animate-in fade-in duration-500" />
        <div className="hero-wash-forest absolute inset-0" />
        <div className="absolute left-5 top-6 flex items-center gap-2">
          <img src={brandMark} alt="" className="size-9 rounded-xl bg-card p-1" />
          <img src={wordmark} alt="SmartWaste360" className="h-6" />
        </div>
        <div key={i} className="absolute inset-x-0 bottom-0 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-[11px] font-semibold uppercase tracking-widest opacity-80">{s.eyebrow}</p>
          <h1 className="mt-2 text-[32px] font-bold leading-[1.08] tracking-tight">{s.title}</h1>
          <p className="mt-3 text-[15px] opacity-90">{s.body}</p>
        </div>
      </div>
      <div className="space-y-4 px-6 pb-8 pt-5">
        <div className="flex justify-center gap-2" role="tablist" aria-label="Intro slides">
          {slides.map((_, n) => (
            <button key={n} aria-label={`Slide ${n + 1}`} onClick={() => setI(n)} className={cn("h-1.5 rounded-full transition-all", n === i ? "w-8 bg-ember" : "w-3 bg-primary-foreground/40")} />
          ))}
        </div>
        {last ? (
          <Link to="/auth"><Btn tone="ember">Get started</Btn></Link>
        ) : (
          <Btn tone="light" onClick={() => setI(i + 1)}>Next</Btn>
        )}
        <Link to="/auth" className="block text-center text-sm font-medium opacity-80">I already have an account</Link>
      </div>
    </div>
  );
}

function Steps({ n, title, sub }: { n: number; title: string; sub?: string | undefined }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <img src={brandMark} alt="SmartWaste360" className="size-9" />
        <span className="text-xs font-semibold text-muted-foreground">Step {n} of 3</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((k) => <span key={k} className={cn("h-1.5 rounded-full", k <= n ? "bg-ember" : "bg-border")} />)}
      </div>
      <h1 className="mt-6 text-[27px] font-bold leading-tight tracking-tight">{title}</h1>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Profile() {
  const { start, email } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <Phone nav={false}>
      <Steps n={1} title="Tell us about you" sub={`Signed in as ${email}. Your partner uses these to reach you.`} />
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (name.trim() && phone.trim()) start(name, phone); }}>
        <Field label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Adaeze Okafor" required autoComplete="name" />
        <Field label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0803 000 0000" inputMode="tel" required autoComplete="tel" />
        <Btn type="submit" tone="ember" disabled={!name.trim() || !phone.trim()}>Continue</Btn>
      </form>
    </Phone>
  );
}

function Address() {
  const { choosePremise } = useStore();
  const [q, setQ] = useState("");
  const list = premises.filter((p) => (p.address + p.area).toLowerCase().includes(q.toLowerCase()));
  return (
    <Phone nav={false}>
      <Steps n={2} title="Where should we collect?" sub="We're rolling out in Ikeja, Yaba and Ajah." />
      <Field label="Search your address" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Street or area" />
      <div className="mt-4 space-y-3">
        {list.length === 0 && <p className="text-sm text-muted-foreground">No match yet — try Ikeja, Yaba or Ajah.</p>}
        {list.map((p) => (
          <button key={p.id} onClick={() => choosePremise(p.id)} className="w-full rounded-3xl border bg-card p-4 text-left transition hover:border-primary">
            <p className="font-semibold">{p.address}, {p.area}</p>
            <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
          </button>
        ))}
      </div>
    </Phone>
  );
}

function ChoosePartner() {
  const { choosePartner, premise } = useStore();
  const [pick, setPick] = useState("");
  return (
    <Phone nav={false}>
      <Steps n={3} title="Choose your collection partner" sub={`Licensed partners serving ${premise?.address}.`} />
      <div className="space-y-3">
        {partners.map((p) => (
          <button key={p.id} onClick={() => setPick(p.id)} className={cn("w-full rounded-3xl border bg-card p-4 text-left transition", pick === p.id && "border-primary ring-2 ring-primary")}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.area} · {p.rating}</p>
                <p className="mt-1 text-sm text-muted-foreground">Next: {p.eta}</p>
              </div>
              <p className="whitespace-nowrap font-semibold">{money(p.charge)}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="sticky bottom-4 mt-5"><Btn disabled={!pick} onClick={() => choosePartner(pick)}>Confirm partner</Btn></div>
    </Phone>
  );
}

function Home() {
  const { model, premise, partner } = useStore();
  const active = model.bins.some((b) => b.state === "Active");
  const open = model.pickups.find((p) => OPEN_PICKUP.includes(p.status));
  const forest = active;
  const title = !active ? "From our hands to your doorstep." : open ? "Your pickup is in progress." : "Let’s make room for a cleaner day.";
  const to = !active ? "/bins" : "/activity";
  const action = !active ? "Get my home ready" : open ? "Track my pickup" : "Request a pickup";
  return (
    <Phone>
      <div className="flex items-center justify-between">
        <div><p className="eyebrow">My residence</p><p className="mt-1 font-semibold">{premise?.address}</p></div>
        <LinkStatus />
      </div>
      <h1 className="mt-6 text-[27px] font-bold tracking-tight">Hello, {model.name.split(" ")[0]}.</h1>
      <div className={cn("relative mt-4 aspect-[4/5] overflow-hidden rounded-[28px]", forest ? "bg-primary" : "bg-ember")}>
        <img src={active ? collectionImg : deliveryImg} alt="" className="absolute inset-0 size-full object-cover" />
        <div className={cn("absolute inset-0", forest ? "hero-wash-forest" : "hero-wash-ember")} />
        <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
          <p className="text-[11px] font-medium uppercase tracking-widest opacity-90">{open ? open.status : premise?.area}</p>
          <h2 className="mt-2 text-[28px] font-bold leading-tight tracking-tight">{title}</h2>
          <p className="mt-2 text-[15px] opacity-90">{open ? `${open.partner} has your request.` : `${partner?.name} · from ${money(partner?.charge ?? 0)} per collection.`}</p>
          <Link to={to}><Btn tone="light" className="mt-6">{action}</Btn></Link>
        </div>
      </div>
      <Link to="/wallet" className="pass mt-4 block rounded-3xl p-5 text-primary-foreground">
        <p className="text-[11px] uppercase tracking-widest opacity-80">Wallet balance</p>
        <p className="mt-1 text-3xl font-bold">{money(model.balance)}</p>
        {model.reserved > 0 && <p className="mt-1 text-sm opacity-80">{money(model.reserved)} held for a pickup</p>}
      </Link>
      <Link to="/report" className="mt-4 flex items-center justify-between rounded-3xl border bg-card p-4">
        <div><p className="font-semibold">Something not right?</p><p className="text-sm text-muted-foreground">Describe it — AI writes the report for you.</p></div>
        <span className="text-sm font-semibold text-ember">Report ›</span>
      </Link>
      {model.notices.length > 0 && (
        <Card className="mt-4">
          <p className="eyebrow">Latest updates</p>
          <ul className="mt-2 space-y-2">
            {model.notices.slice(0, 4).map((n) => (
              <li key={n.id} className="text-sm"><span className="font-semibold">{n.from === "lawma" ? "LAWMA" : n.from === "partner" ? "Partner" : "You"} · </span>{n.text}</li>
            ))}
          </ul>
        </Card>
      )}
    </Phone>
  );
}
