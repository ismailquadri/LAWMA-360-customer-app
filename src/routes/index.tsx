import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, Bell, Building2, MapPin, Package, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { brandMark, Btn, LinkStatus, Phone } from "@/components/app";
import {
  IosBadge,
  IosButton,
  IosEmpty,
  IosField,
  IosRow,
  IosSearchBar,
  IosSection,
} from "@/components/ios";
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
  const { ready, introDone, completeIntro, model } = useStore();
  if (!ready) return <Splash />;
  if (!introDone) return <Intro onDone={completeIntro} />;
  if (!model.name) return <Profile />;
  if (!model.premiseId) return <Address />;
  if (!model.partnerId) return <ChoosePartner />;
  return <Home />;
}

function Splash() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col items-center justify-center gap-4 bg-primary text-primary-foreground">
      <div className="grid size-20 place-items-center rounded-[22px] bg-white p-3 shadow-xl">
        <img src={brandMark} alt="" className="size-full object-contain animate-pulse" />
      </div>
      <img src={wordmark} alt="SmartWaste360" className="h-8" />
    </div>
  );
}

const slides = [
  { img: dawnImg, eyebrow: "Before SmartWaste360", title: "No more waiting for the truck at dawn.", body: "Book a pickup that fits your day and see exactly when your crew is coming." },
  { img: deliveryImg, eyebrow: "Smart bins", title: "Bins delivered to your door.", body: "Your licensed partner brings and services the right bins for your home." },
  { img: collectionImg, eyebrow: "One line to LAWMA", title: "Report a problem in seconds.", body: "Describe it in your own words — we write it up clearly and send it to the right people." },
];

function Intro({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const s = slides[i]!;
  const last = i === slides.length - 1;
  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-primary text-primary-foreground">
      <div className="relative min-h-[240px] flex-1 overflow-hidden">
        <img key={s.img} src={s.img} alt="" className="absolute inset-0 size-full object-cover animate-in fade-in duration-500" />
        <div className="hero-wash-forest absolute inset-0" />
        <div className="absolute left-5 top-6 flex items-center gap-2.5 min-[480px]:top-14">
          <img src={brandMark} alt="" className="size-9 rounded-[10px] bg-white p-1 shadow-sm" />
          <img src={wordmark} alt="SmartWaste360" className="h-6" />
        </div>
        <div key={i} className="absolute inset-x-0 bottom-0 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] opacity-85">{s.eyebrow}</p>
          <h1 className="mt-2 text-[32px] font-bold leading-[1.08] tracking-[-0.025em]">{s.title}</h1>
          <p className="mt-3 text-[15px] leading-[22px] opacity-90">{s.body}</p>
        </div>
      </div>
      <div className="space-y-4 px-5 pb-8 pt-5 min-[480px]:pb-9">
        <div className="flex justify-center gap-2" role="tablist" aria-label="Intro slides">
          {slides.map((_, n) => (
            <button
              key={n}
              type="button"
              aria-label={`Slide ${n + 1}`}
              onClick={() => setI(n)}
              className={cn(
                "h-2 rounded-full transition-all",
                n === i ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60",
              )}
            />
          ))}
        </div>
        {last ? (
          <IosButton tone="ember" onClick={onDone}>Get started</IosButton>
        ) : (
          <IosButton tone="light" onClick={() => setI(i + 1)}>Continue</IosButton>
        )}
        {!last && (
          <button
            type="button"
            onClick={onDone}
            className="block min-h-[36px] w-full text-center text-[15px] font-medium text-white/85 hover:text-white"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}

function Steps({ n, title, sub }: { n: number; title: string; sub?: string | undefined }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <img src={brandMark} alt="SmartWaste360" className="size-9 rounded-[9px]" />
        <span className="text-[13px] font-semibold text-muted-foreground">Step {n} of 3</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-1.5" aria-hidden="true">
        {[1, 2, 3].map((k) => (
          <span key={k} className={cn("h-1 rounded-full transition-colors", k <= n ? "bg-primary" : "bg-[#3c3c43]/15")} />
        ))}
      </div>
      <h1 className="mt-5 text-[34px] font-bold leading-[1.12] tracking-[-0.025em]">{title}</h1>
      {sub && <p className="mt-1.5 text-[15px] leading-[20px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Profile() {
  const { start } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <Phone nav={false}>
      <Steps n={1} title="Tell us about you" sub="Set up your resident profile for waste pickups." />
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim() && phone.trim()) start(name, phone);
        }}
      >
        <IosSection header="Contact details" footer="Your collection partner uses these details to reach you on arrival.">
          <IosField
            label="Full name"
            name="fullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adaeze Okafor"
            required
            autoComplete="name"
            enterKeyHint="next"
          />
          <IosField
            label="Phone number"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0803 000 0000"
            inputMode="tel"
            required
            autoComplete="tel"
            enterKeyHint="done"
          />
        </IosSection>
        <IosButton type="submit" tone="ember" disabled={!name.trim() || !phone.trim()}>
          Continue
        </IosButton>
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
      <div className="mb-4">
        <IosSearchBar
          label="Search your street or area"
          value={q}
          onChange={setQ}
          placeholder="Search street or area (Ikeja, Yaba, Ajah)"
        />
      </div>
      {list.length === 0 ? (
        <IosEmpty icon={<MapPin className="size-5" />} title="No address match">
          Try searching for Ikeja, Yaba, or Ajah.
        </IosEmpty>
      ) : (
        <IosSection header="Rollout addresses">
          {list.map((p) => (
            <IosRow
              key={p.id}
              onClick={() => choosePremise(p.id)}
              icon={<MapPin className="size-4" />}
              iconTone="forest"
              title={`${p.address}, ${p.area}`}
              subtitle={p.detail}
              disclosure
            />
          ))}
        </IosSection>
      )}
    </Phone>
  );
}

function ChoosePartner() {
  const { choosePartner, premise } = useStore();
  const [pick, setPick] = useState("");
  return (
    <Phone nav={false}>
      <Steps n={3} title="Choose your partner" sub={`Licensed PSP partners serving ${premise?.address}.`} />
      <IosSection header="Available PSP operators">
        {partners.map((p) => (
          <IosRow
            key={p.id}
            onClick={() => setPick(p.id)}
            icon={<Building2 className="size-4" />}
            iconTone={pick === p.id ? "forest" : "slate"}
            title={p.name}
            subtitle={`${p.area} · ${p.rating} · Next: ${p.eta}`}
            detail={money(p.charge)}
            selected={pick === p.id}
          />
        ))}
      </IosSection>
      <div className="sticky bottom-4 mt-5 min-[480px]:bottom-6">
        <IosButton tone="primary" disabled={!pick} onClick={() => choosePartner(pick)}>
          Confirm partner
        </IosButton>
      </div>
    </Phone>
  );
}

function Home() {
  const { model, premise, partner } = useStore();
  const active = model.bins.some((b) => b.state === "Active");
  const open = model.pickups.find((p) => OPEN_PICKUP.includes(p.status));
  const forest = active;
  const title = !active
    ? "From our hands to your doorstep."
    : open
      ? "Your pickup is in progress."
      : "Let’s make room for a cleaner day.";
  const to = !active ? "/bins" : "/activity";
  const action = !active ? "Get my home ready" : open ? "Track my pickup" : "Request a pickup";

  return (
    <Phone>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow">My residence</p>
          <p className="truncate text-[14px] font-medium text-foreground">{premise?.address}</p>
        </div>
        <LinkStatus />
      </div>

      <h1 className="mt-3 text-[34px] font-bold leading-[1.12] tracking-[-0.025em]">
        Hello, {model.name.split(" ")[0]}.
      </h1>

      <div className={cn("relative mt-4 aspect-[6/5] overflow-hidden rounded-[20px]", forest ? "bg-primary" : "bg-ember")}>
        <img src={active ? collectionImg : deliveryImg} alt="" className="absolute inset-0 size-full object-cover" />
        <div className={cn("absolute inset-0", forest ? "hero-wash-forest" : "hero-wash-ember")} />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] opacity-90">
            {open ? open.status : premise?.area}
          </p>
          <h2 className="mt-1.5 text-[24px] font-bold leading-[1.15] tracking-[-0.02em]">{title}</h2>
          <p className="mt-1.5 text-[14px] leading-[19px] opacity-90">
            {open ? `${open.partner} has your request.` : `${partner?.name} · from ${money(partner?.charge ?? 0)}`}
          </p>
          <Link to={to} className="mt-4 block">
            <Btn tone="light">{action}</Btn>
          </Link>
        </div>
      </div>

      <Link to="/wallet" className="wallet-balance mt-4 block transition-transform active:scale-[0.985]">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/75">Demo wallet balance</p>
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[12px] font-medium text-white">Wallet ›</span>
        </div>
        <p className="mt-1.5 text-[32px] font-bold leading-tight tracking-tight tabular-nums">{money(model.balance)}</p>
        {model.reserved > 0 && (
          <p className="mt-1 text-[13px] text-white/80 tabular-nums">{money(model.reserved)} held for active pickup</p>
        )}
      </Link>

      <div className="mt-6 space-y-6">
        <IosSection header="Quick actions">
          <IosRow
            to="/bins"
            icon={<Package className="size-4" />}
            iconTone="green"
            title="Smart bins"
            detail={`${model.bins.length} assigned`}
            disclosure
          />
          <IosRow
            to="/report"
            icon={<AlertCircle className="size-4" />}
            iconTone="ember"
            title="Report an issue"
            subtitle="Missed pickup or illegal dumping"
            disclosure
          />
          <IosRow
            to="/you"
            icon={<ShieldCheck className="size-4" />}
            iconTone="blue"
            title="Collection partner"
            detail={partner?.name.split(" ")[0]}
            disclosure
          />
        </IosSection>

        {model.notices.length > 0 && (
          <IosSection header="Latest updates">
            {model.notices.slice(0, 4).map((n) => (
              <IosRow
                key={n.id}
                icon={<Bell className="size-4" />}
                iconTone={n.from === "lawma" ? "blue" : n.from === "partner" ? "green" : "slate"}
                title={n.text}
                subtitle={`${n.from === "lawma" ? "LAWMA" : n.from === "partner" ? "Partner" : "System"} · ${n.time}`}
                trailing={<IosBadge>{n.from === "app" ? "Updated" : "Notice"}</IosBadge>}
              />
            ))}
          </IosSection>
        )}
      </div>
    </Phone>
  );
}
