import { useId } from "react";
import { cn } from "@/lib/utils";

type LogoSize = "xs" | "sm" | "md" | "lg";

const sizeMap: Record<LogoSize, string> = {
  xs: "size-6 rounded-[6px]",
  sm: "size-[30px] rounded-[7px]",
  md: "size-10 rounded-[10px]",
  lg: "size-12 rounded-[12px]",
};

interface PartnerLogoProps {
  partnerId?: string | undefined;
  name?: string | undefined;
  size?: LogoSize | undefined;
  decorative?: boolean | undefined;
  className?: string | undefined;
}

/**
 * Renders bespoke vector brand marks for each licensed LAWMA 360 PSP collection partner
 * inside an Apple iOS squircle icon container.
 */
export function PartnerLogo({
  partnerId,
  name = "Collection partner",
  size = "md",
  decorative = true,
  className,
}: PartnerLogoProps) {
  const uid = useId().replace(/:/g, "");

  const svgProps = decorative
    ? { "aria-hidden": true as const }
    : { role: "img" as const, "aria-label": `${name} logo` };

  const renderGraphic = () => {
    switch (partnerId) {
      case "PAR-001":
        // GreenLine Collection: Emerald route sweep + leaf silhouette
        return (
          <svg viewBox="0 0 48 48" className="size-full" {...svgProps}>
            <defs>
              <linearGradient id={`${uid}-g1`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="55%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" fill={`url(#${uid}-g1)`} />
            {/* Clean route wave lines */}
            <path
              d="M9 33c6-9 13-13 21-15 3.5-.9 6.5-2.8 9-6-1.5 6.8-5.5 11.4-12 13.5-5.6 1.8-10.2 5.2-13.5 10.5H9Z"
              fill="#ffffff"
              fillOpacity="0.95"
            />
            <path
              d="M14.5 38.5c4.2-6 9.5-9.2 16-10.7 2.5-.6 4.7-1.6 6.5-3.3-1.2 4.6-4.2 7.8-9.2 9.5-4.3 1.4-7.6 3.2-10 4.5h-3.3Z"
              fill="#bbf7d0"
            />
            <circle cx="35.5" cy="12.5" r="2.5" fill="#fef08a" />
          </svg>
        );

      case "PAR-006":
        // Mainland Clean Services: Architectural bridge 'M' crest + four-point sparkle
        return (
          <svg viewBox="0 0 48 48" className="size-full" {...svgProps}>
            <defs>
              <linearGradient id={`${uid}-g6`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="55%" stopColor="#0369a1" />
                <stop offset="100%" stopColor="#172554" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" fill={`url(#${uid}-g6)`} />
            <path
              d="M10 35V19.5c0-1.4 1.6-2.1 2.7-1.2L24 27.4l11.3-9.1c1.1-.9 2.7-.2 2.7 1.2V35h-5.2V25.7l-7.2 5.8a2.5 2.5 0 0 1-3.2 0l-7.2-5.8V35H10Z"
              fill="#ffffff"
            />
            <path
              d="M24 8.5l1.6 3.7 3.7 1.6-3.7 1.6L24 19.1l-1.6-3.7-3.7-1.6 3.7-1.6L24 8.5Z"
              fill="#bae6fd"
            />
          </svg>
        );

      case "PAR-009":
        // Neighbourhood Waste Co.: Dual warm residential roof gables + leaf emblem
        return (
          <svg viewBox="0 0 48 48" className="size-full" {...svgProps}>
            <defs>
              <linearGradient id={`${uid}-g9`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="55%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#9a3412" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" fill={`url(#${uid}-g9)`} />
            <path
              d="M24 11L9.5 22.8a1.5 1.5 0 0 0 .9 2.7H14v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10h3.6a1.5 1.5 0 0 0 .9-2.7L24 11Z"
              fill="#ffffff"
              fillOpacity="0.96"
            />
            <path
              d="M24 20.5c3.5 0 6 2.5 6 5.8 0 3.7-3.2 6.2-6 7.4-2.8-1.2-6-3.7-6-7.4 0-3.3 2.5-5.8 6-5.8Z"
              fill="#ea580c"
            />
            <path d="M24 23v8.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      case "PAR-014":
        // ClearPath Environmental: Precision double-forward lane chevrons on teal portal
        return (
          <svg viewBox="0 0 48 48" className="size-full" {...svgProps}>
            <defs>
              <linearGradient id={`${uid}-g14`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="55%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#134e4a" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" fill={`url(#${uid}-g14)`} />
            <circle cx="24" cy="24" r="14.5" fill="#ffffff" fillOpacity="0.16" />
            <path
              d="M14 15.5L22.5 24 14 32.5"
              fill="none"
              stroke="#ccfbf1"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25.5 15.5L34 24l-8.5 8.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      case "PAR-016":
        // EkoCycle Services: Continuous geometric recycling loop on deep indigo
        return (
          <svg viewBox="0 0 48 48" className="size-full" {...svgProps}>
            <defs>
              <linearGradient id={`${uid}-g16`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="55%" stopColor="#4338ca" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" fill={`url(#${uid}-g16)`} />
            {/* Dual interlocking circular-economy arcs */}
            <path
              d="M15.5 18.5A11 11 0 0 1 33 16.2"
              fill="none"
              stroke="#bef264"
              strokeWidth="3.6"
              strokeLinecap="round"
            />
            <polygon points="34.5,11 36.5,19 28.5,17.8" fill="#bef264" />
            <path
              d="M32.5 29.5A11 11 0 0 1 15 31.8"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.6"
              strokeLinecap="round"
            />
            <polygon points="13.5,37 11.5,29 19.5,30.2" fill="#ffffff" />
            <circle cx="24" cy="24" r="3.2" fill="#a5f3fc" />
          </svg>
        );

      default: {
        const initials =
          name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0]?.toUpperCase() ?? "")
            .join("") || "LP";
        return (
          <svg viewBox="0 0 48 48" className="size-full" {...svgProps}>
            <defs>
              <linearGradient id={`${uid}-def`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1b6543" />
                <stop offset="100%" stopColor="#0f3d28" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" fill={`url(#${uid}-def)`} />
            <text
              x="24"
              y="29.5"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="16"
              fontWeight="700"
              fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
            >
              {initials}
            </text>
          </svg>
        );
      }
    }
  };

  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.12),inset_0_0_0_0.5px_rgba(255,255,255,0.22)]",
        sizeMap[size],
        className,
      )}
    >
      {renderGraphic()}
    </span>
  );
}
