import type { ReportDraft } from "./report-ai";

export type DialectCode = "pcm" | "yo" | "ig" | "ha" | "en";

export interface DialectSpec {
  code: DialectCode;
  label: string;
  nativeName: string;
  speechLang: string;
  greeting: string;
  listeningHint: string;
  replyReady: string;
  samples: readonly { label: string; text: string }[];
}

export const DIALECTS: readonly DialectSpec[] = [
  {
    code: "pcm",
    label: "Pidgin",
    nativeName: "Naija Pidgin",
    speechLang: "en-NG",
    greeting: "How far! Tell me wetin happen — any illegal doti dumping or blocked gutter for your street?",
    listeningHint: "I dey listen… talk inside your mic",
    replyReady: "I don hear you clear. Make I prepare dis report send go LAWMA?",
    samples: [
      {
        label: "Illegal dumping for gutter",
        text: "Dem dey pour doti for inside gutter near Olowu Street since morning, di smell bad well well.",
      },
      {
        label: "Roadside refuse heap",
        text: "One tipper come offload nylon and waste beside di junction, e don block half of di road.",
      },
    ],
  },
  {
    code: "yo",
    label: "Yorùbá",
    nativeName: "Èdè Yorùbá",
    speechLang: "yo-NG",
    greeting: "Ẹ káàbọ̀! Kí ló ṣẹlẹ̀ ní agbègbè yín? Ẹ sọ nípa ìdọ̀tí tí wọ́n dà sí ibi tí òfin kò fàyè gbà.",
    listeningHint: "Mo ń gbọ́ yín… ẹ sọ̀rọ̀ sí ẹ̀rọ",
    replyReady: "Mo ti gbọ́ ìjábọ̀ yín. Ṣé kí n ṣètò rẹ̀ fún LAWMA báyìí?",
    samples: [
      {
        label: "Dídà ìdọ̀tí sí etí kòtò",
        text: "Àwọn èèyàn ń dà ìdọ̀tí sí etí kòtò omi ní Olowu Street, ó ti dí ojú agbami.",
      },
      {
        label: "Ìdọ̀tí ní ojú ọ̀nà",
        text: "Wọ́n kó àpò ìdọ̀tí jọ sí ẹ̀gbẹ́ títì ní Ikeja, ó ń rùn púpọ̀.",
      },
    ],
  },
  {
    code: "ig",
    label: "Igbo",
    nativeName: "Asụsụ Igbo",
    speechLang: "ig-NG",
    greeting: "Nnọọ! Gịnị mere na mpaghara gị? Gwa m maka ahịhịa a tụfuru n’ụzọ megidere iwu.",
    listeningHint: "Ana m ege ntị… kwuo okwu ugbu a",
    replyReady: "Anụla m akụkọ gị. Ka m kwado ya iziga LAWMA ugbu a?",
    samples: [
      {
        label: "Ịtụfu ahịhịa n’ọwa mmiri",
        text: "Ndị mmadụ na-atụfu ahịhịa n’ime mmiri ọwa dị na Yaba, ọ na-esi isi ọjọọ.",
      },
      {
        label: "Ahịhịa n’okporo ụzọ",
        text: "A tụfuru nnukwu ahịhịa n’akụkụ ụzọ anyị, ọ na-egbochi ndị mmadụ ịgafe.",
      },
    ],
  },
  {
    code: "ha",
    label: "Hausa",
    nativeName: "Harshen Hausa",
    speechLang: "ha-NG",
    greeting: "Sannu! Me ke faruwa a unguwarku? Faɗa mini game da zubar da shara ba bisa ƙa'ida ba.",
    listeningHint: "Ina sauraro… yi magana yanzu",
    replyReady: "Na ji bayaninka sosai. In haɗa rahoton zuwa ga hukumar LAWMA?",
    samples: [
      {
        label: "Zubar da shara a magudana",
        text: "Mutane suna zubar da shara a bakin magudanar ruwa a Ajah, ta cika ta toshe hanya.",
      },
      {
        label: "Tarin shara a bakin titi",
        text: "An zubar da buhunan shara a gefen titi da daddare, yana da haɗari ga lafiya.",
      },
    ],
  },
  {
    code: "en",
    label: "English",
    nativeName: "English (NG)",
    speechLang: "en-NG",
    greeting: "Hello! Tell me where illegal dumping or waste overflow is happening so I can alert LAWMA.",
    listeningHint: "Listening… speak clearly",
    replyReady: "Got it. Ready for you to review and dispatch to LAWMA?",
    samples: [
      {
        label: "Drainage blocked by dumping",
        text: "Someone has dumped refuse sacks inside the drainage canal beside Olowu Street, causing flooding risk.",
      },
      {
        label: "Unauthorized roadside heap",
        text: "Uncollected commercial waste bags were dumped overnight near the junction and are obstructing traffic.",
      },
    ],
  },
] as const;

export function getDialect(code: DialectCode): DialectSpec {
  return DIALECTS.find((d) => d.code === code) ?? DIALECTS[0]!;
}

/**
 * Classifies and translates a resident's spoken or typed dialect report into a structured
 * LAWMA/PSP dispatch draft while preserving the original verbatim dialect statement.
 */
export function buildDialectReport(
  transcript: string,
  dialect: DialectCode,
  context?: { address?: string | undefined; area?: string | undefined },
): ReportDraft & { translatedSummary: string; dialectLabel: string } {
  const clean = transcript.trim();
  const lower = clean.toLowerCase();
  const spec = getDialect(dialect);

  const isDrain = /(gutter|drain|canal|kòtò|agbami|mmiri|ọwa|magudana|flood)/.test(lower);
  const isFire = /(burn|fire|smoke|iná|ọkụ|wuta)/.test(lower);
  const isMissed = /(neva carry|haven'?t come|kò sí ẹni|abịabeghị|ba a kwashe|missed|delay)/.test(lower);
  const isBin = /(bin|dustbin|àpótí|ite ahịhịa|kwandon)/.test(lower) && !isDrain && !isFire;

  let category: ReportDraft["category"] = "Illegal dumping";
  let urgency: ReportDraft["urgency"] = "high";
  let sendTo: ReportDraft["sendTo"] = ["lawma"];
  let englishAction =
    "Illegal refuse dumping has been observed at this location and requires urgent enforcement and clearance.";

  if (isFire) {
    category = "Burning waste";
    urgency = "high";
    sendTo = ["lawma"];
    englishAction = "Open waste burning has been reported in this area, posing an immediate air-quality and safety hazard.";
  } else if (isDrain) {
    category = "Blocked drain";
    urgency = "high";
    sendTo = ["lawma"];
    englishAction =
      "Unauthorized dumping into a stormwater drainage channel has been reported, risking blockage and flooding.";
  } else if (isMissed) {
    category = "Missed pickup";
    urgency = "medium";
    sendTo = ["partner", "lawma"];
    englishAction = "Scheduled household collection appears overdue at this residence and needs partner dispatch.";
  } else if (isBin) {
    category = "Overflowing bin";
    urgency = "medium";
    sendTo = ["partner"];
    englishAction = "The resident's waste bin is overflowing and requires priority servicing.";
  }

  const locationHint = context?.address
    ? `Near ${context.address}${context.area ? `, ${context.area}` : ""}`
    : "Lagos resident location";

  const translatedSummary = `${locationHint}: ${englishAction}`;
  const title = `${category} (${spec.label} Voice)`;
  const report = `${translatedSummary}\n\nOriginal ${spec.label} transcript:\n“${clean}”`;

  return {
    category,
    urgency,
    sendTo,
    title,
    report,
    translatedSummary,
    dialectLabel: spec.nativeName,
  };
}
