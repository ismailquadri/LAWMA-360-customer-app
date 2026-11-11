import { Mic, MicOff, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { IosButton, IosSection } from "@/components/ios";
import {
  buildDialectReport,
  DIALECTS,
  getDialect,
  type DialectCode,
} from "@/lib/voice-agent";
import type { ReportDraft } from "@/lib/report-ai";
import { cn } from "@/lib/utils";

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((ev: SpeechRecognitionEventLike) => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function LocalVoiceAgent({
  address,
  area,
  onDraftReady,
}: {
  address?: string | undefined;
  area?: string | undefined;
  onDraftReady: (draft: ReportDraft & { translatedSummary: string; dialectLabel: string }, rawTranscript: string) => void;
}) {
  const [dialect, setDialect] = useState<DialectCode>("pcm");
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [agentMessage, setAgentMessage] = useState(() => getDialect("pcm").greeting);
  const [micNote, setMicNote] = useState<string | null>(null);

  const recRef = useRef<SpeechRecognitionInstance | null>(null);
  const transcriptId = useId();
  const spec = getDialect(dialect);

  useEffect(() => {
    setSpeechSupported(getSpeechRecognitionCtor() !== null);
    return () => {
      try {
        recRef.current?.stop();
      } catch {
        /* ignore cleanup errors */
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback(
    (phrase: string, langCode: string) => {
      if (voiceMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(phrase);
        utter.lang = langCode;
        utter.rate = 0.96;
        const voices = window.speechSynthesis.getVoices();
        const match =
          voices.find((v) => v.lang.toLowerCase() === langCode.toLowerCase()) ??
          voices.find((v) => v.lang.toLowerCase().startsWith(langCode.split("-")[0]!.toLowerCase())) ??
          voices.find((v) => v.lang.toLowerCase().startsWith("en-ng"));
        if (match) utter.voice = match;
        window.speechSynthesis.speak(utter);
      } catch {
        /* SpeechSynthesis unavailable in sandboxed browser */
      }
    },
    [voiceMuted],
  );

  const switchDialect = (next: DialectCode) => {
    setDialect(next);
    const nextSpec = getDialect(next);
    setAgentMessage(nextSpec.greeting);
    setMicNote(null);
    if (listening) {
      recRef.current?.stop();
      setListening(false);
    }
    speak(nextSpec.greeting, nextSpec.speechLang);
  };

  const toggleMic = () => {
    if (listening) {
      try {
        recRef.current?.stop();
      } catch {
        /* ignore */
      }
      setListening(false);
      return;
    }

    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setSpeechSupported(false);
      setMicNote("Live speech recognition isn’t supported in this browser — tap a phrase below or type in your dialect.");
      return;
    }

    setMicNote(null);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    try {
      const rec = new Ctor();
      rec.lang = spec.speechLang;
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      rec.continuous = false;

      rec.onresult = (ev) => {
        let joined = "";
        let finalized = false;
        for (let i = 0; i < ev.results.length; i++) {
          const r = ev.results[i];
          if (!r) continue;
          joined += r[0].transcript + " ";
          if (r.isFinal) finalized = true;
        }
        const clean = joined.trim();
        setTranscript(clean);
        if (finalized && clean.length >= 6) {
          setAgentMessage(spec.replyReady);
          speak(spec.replyReady, spec.speechLang);
        }
      };

      rec.onerror = (ev) => {
        setListening(false);
        if (ev.error === "not-allowed" || ev.error === "service-not-allowed") {
          setMicNote("Microphone access denied. You can still type or tap a sample phrase below.");
        } else if (ev.error !== "aborted") {
          setMicNote("Couldn’t capture clear audio — try speaking again or tap a sample phrase below.");
        }
      };

      rec.onend = () => {
        setListening(false);
      };

      recRef.current = rec;
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
      setMicNote("Microphone unavailable here — type or tap a sample dialect phrase below.");
    }
  };

  const handleSample = (sampleText: string) => {
    setTranscript(sampleText);
    setAgentMessage(spec.replyReady);
    setMicNote(null);
    speak(sampleText, spec.speechLang);
  };

  const prepareReport = () => {
    const clean = transcript.trim();
    if (clean.length < 6) return;
    const drafted = buildDialectReport(clean, dialect, { address, area });
    setAgentMessage(spec.replyReady);
    speak(spec.replyReady, spec.speechLang);
    onDraftReady(drafted, clean);
  };

  return (
    <div className="space-y-5">
      {/* Dialect Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="eyebrow">Choose dialect</span>
          <button
            type="button"
            onClick={() => {
              const nextMuted = !voiceMuted;
              setVoiceMuted(nextMuted);
              if (nextMuted && typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
              }
            }}
            aria-pressed={!voiceMuted}
            aria-label={voiceMuted ? "Unmute voice agent" : "Mute voice agent"}
            className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[12px] font-medium text-foreground ring-1 ring-black/[0.08]"
          >
            {voiceMuted ? (
              <>
                <VolumeX className="size-3.5 text-muted-foreground" aria-hidden="true" />
                <span>Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="size-3.5 text-primary" aria-hidden="true" />
                <span>Voice On</span>
              </>
            )}
          </button>
        </div>

        <div
          role="radiogroup"
          aria-label="Local reporting dialect"
          className="flex flex-wrap gap-1.5"
        >
          {DIALECTS.map((d) => {
            const active = d.code === dialect;
            return (
              <button
                key={d.code}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => switchDialect(d.code)}
                className={cn(
                  "min-h-[36px] rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all",
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-foreground ring-1 ring-black/[0.07] hover:bg-white/80",
                )}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Siri-style Agent Console */}
      <div className="ios-card overflow-hidden">
        <div className="bg-gradient-to-b from-[#17593a]/[0.06] to-transparent px-4 pb-5 pt-4 text-center">
          {/* Assistant Spoken Prompt */}
          <div className="rounded-[14px] bg-white px-4 py-3 text-left shadow-[0_1px_3px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.05]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                LAWMA Local Agent · {spec.nativeName}
              </span>
              <button
                type="button"
                onClick={() => speak(agentMessage, spec.speechLang)}
                aria-label="Replay voice prompt"
                className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/15"
              >
                <Volume2 className="size-3.5" />
              </button>
            </div>
            <p className="mt-1.5 text-[15px] leading-[21px] text-foreground">{agentMessage}</p>
          </div>

          {/* Pulsing Voice Mic Button */}
          <div className="relative mx-auto mt-6 inline-flex items-center justify-center">
            {listening && (
              <>
                <span
                  aria-hidden="true"
                  className="absolute size-[96px] rounded-full bg-ember/25 animate-ping"
                />
                <span
                  aria-hidden="true"
                  className="absolute size-[86px] rounded-full bg-primary/20 animate-pulse"
                />
              </>
            )}
            <button
              type="button"
              onClick={toggleMic}
              aria-pressed={listening}
              aria-label={listening ? "Stop voice recording" : `Speak report in ${spec.label}`}
              className={cn(
                "relative z-10 grid size-[72px] place-items-center rounded-full text-white shadow-lg transition-all",
                listening
                  ? "bg-ember scale-105 shadow-ember/30"
                  : "bg-primary shadow-primary/25 hover:brightness-105",
              )}
            >
              {listening ? <MicOff className="size-7" /> : <Mic className="size-7" />}
            </button>
          </div>

          <p aria-live="polite" className="mt-3 text-[13px] font-medium text-muted-foreground">
            {listening ? spec.listeningHint : speechSupported ? `Tap mic to speak in ${spec.label}` : "Type or pick a dialect phrase below"}
          </p>

          {micNote && (
            <p className="mt-2 rounded-[10px] bg-ember/10 px-3 py-2 text-[12px] font-medium text-[#9a3405]">
              {micNote}
            </p>
          )}
        </div>

        {/* Live Transcript Input */}
        <div className="border-t border-[#3c3c43]/[0.12] bg-white px-4 py-3">
          <label htmlFor={transcriptId} className="block text-[12px] font-medium text-muted-foreground">
            Your voice or text in {spec.label}
          </label>
          <textarea
            id={transcriptId}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={3}
            placeholder={`Speak into mic or type in ${spec.label}…`}
            className="mt-1.5 w-full resize-none bg-transparent text-[16px] leading-[22px] text-foreground placeholder:text-[#3c3c43]/40 focus:outline-none"
          />
          <div className="mt-3">
            <IosButton
              tone="primary"
              disabled={transcript.trim().length < 6}
              onClick={prepareReport}
            >
              <Sparkles className="size-4" aria-hidden="true" />
              Translate &amp; prepare LAWMA report
            </IosButton>
          </div>
        </div>
      </div>

      {/* Quick One-Tap Dialect Samples (useful for demos / browsers without mic) */}
      <IosSection
        header={`Try ${spec.label} voice samples`}
        footer="Tap any example to hear the dialect prompt and test instant translation to LAWMA dispatch."
      >
        {spec.samples.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => handleSample(s.text)}
            className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-black/[0.02] active:bg-[#d1d1d6]/50"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"
            >
              <Mic className="size-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-semibold text-foreground">{s.label}</span>
              <span className="mt-0.5 block text-[13px] leading-[18px] text-muted-foreground">
                “{s.text}”
              </span>
            </span>
          </button>
        ))}
      </IosSection>
    </div>
  );
}
