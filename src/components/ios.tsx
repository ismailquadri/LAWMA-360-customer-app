import { Link } from "@tanstack/react-router";
import { Check, ChevronRight, Search, X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  iOS Inset Grouped Sections & Table Cells                                  */
/* -------------------------------------------------------------------------- */

export function IosSection({
  header,
  footer,
  children,
  className,
}: {
  header?: string | undefined;
  footer?: string | undefined;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <section className={cn("space-y-1.5", className)}>
      {header && <h2 className="eyebrow px-4">{header}</h2>}
      <div className="ios-group ios-group-divide">{children}</div>
      {footer && <p className="px-4 text-[13px] leading-[18px] text-muted-foreground">{footer}</p>}
    </section>
  );
}

const iconTones = {
  forest: "bg-[#17593a] text-white",
  ember: "bg-[#c84e0d] text-white",
  green: "bg-[#248a3d] text-white",
  blue: "bg-[#007aff] text-white",
  slate: "bg-[#636366] text-white",
  red: "bg-[#d92d20] text-white",
} as const;

export type IosIconTone = keyof typeof iconTones;

interface IosRowBaseProps {
  title: ReactNode;
  subtitle?: ReactNode | undefined;
  detail?: ReactNode | undefined;
  leading?: ReactNode | undefined;
  icon?: ReactNode | undefined;
  iconTone?: IosIconTone | undefined;
  disclosure?: boolean | undefined;
  selected?: boolean | undefined;
  trailing?: ReactNode | undefined;
  className?: string | undefined;
}

function IosRowContent({
  title,
  subtitle,
  detail,
  leading,
  icon,
  iconTone = "forest",
  disclosure,
  selected,
  trailing,
}: IosRowBaseProps) {
  return (
    <>
      {leading}
      {!leading && icon && (
        <span
          aria-hidden="true"
          className={cn(
            "grid size-[30px] shrink-0 place-items-center rounded-[7px] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.2)]",
            iconTones[iconTone],
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1 py-0.5 text-left">
        <span className="block text-[16px] leading-[21px] font-medium tracking-[-0.015em] text-foreground">
          {title}
        </span>
        {subtitle && (
          <span className="mt-0.5 block text-[13px] leading-[17px] text-muted-foreground">{subtitle}</span>
        )}
      </span>
      {detail && (
        <span className="shrink-0 text-[15px] text-muted-foreground tabular-nums">{detail}</span>
      )}
      {trailing}
      {selected && <Check className="size-5 shrink-0 text-primary" strokeWidth={2.4} aria-hidden="true" />}
      {disclosure && (
        <ChevronRight className="size-[18px] shrink-0 text-[#3c3c43]/35" strokeWidth={2.2} aria-hidden="true" />
      )}
    </>
  );
}

export function IosRow(
  props: IosRowBaseProps &
    (
      | { onClick: () => void; to?: undefined; disabled?: boolean }
      | { to: string; onClick?: undefined; disabled?: undefined }
      | { onClick?: undefined; to?: undefined; disabled?: undefined }
    ),
) {
  const layout = "flex min-h-[48px] w-full items-center gap-3 px-4 py-2.5 text-left";
  const interactive = "cursor-pointer transition-colors hover:bg-black/[0.02] active:bg-[#d1d1d6]/55";

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cn(layout, interactive, props.className)}>
        <IosRowContent {...props} />
      </Link>
    );
  }

  if ("onClick" in props && props.onClick) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        disabled={props.disabled}
        className={cn(layout, interactive, "disabled:opacity-45", props.className)}
      >
        <IosRowContent {...props} />
      </button>
    );
  }

  return (
    <div className={cn(layout, props.className)}>
      <IosRowContent {...props} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  iOS Buttons                                                               */
/* -------------------------------------------------------------------------- */

export type IosButtonTone = "primary" | "ember" | "tinted" | "gray" | "light" | "ghost" | "destructive";

type IosButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: IosButtonTone | undefined;
};

export function IosButton({ tone = "primary", type = "button", className, ...props }: IosButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        "inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[13px] px-5 text-[16px] font-semibold tracking-[-0.015em] transition-all disabled:pointer-events-none disabled:opacity-40",
        tone === "primary" && "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(23,89,58,0.18)]",
        tone === "ember" && "bg-ember text-ember-foreground shadow-[0_2px_8px_rgba(200,78,13,0.2)]",
        tone === "tinted" && "bg-primary/12 text-primary hover:bg-primary/16",
        tone === "gray" && "bg-[#767680]/[0.12] text-foreground hover:bg-[#767680]/[0.18]",
        tone === "light" && "bg-white text-primary shadow-sm",
        tone === "ghost" && "bg-white text-primary ring-1 ring-black/[0.08] hover:bg-black/[0.02]",
        tone === "destructive" && "bg-[#d92d20]/10 text-[#c92117] hover:bg-[#d92d20]/15",
        className,
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  iOS Fields & Search Bar                                                   */
/* -------------------------------------------------------------------------- */

export function IosField({
  label,
  hint,
  className,
  id: providedId,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string | undefined }) {
  const autoId = useId();
  const id = providedId ?? autoId;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className="block px-4 py-3">
      <label htmlFor={id} className="block text-[13px] font-medium text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={hintId}
        {...rest}
        className={cn(
          "mt-1 block min-h-[34px] w-full bg-transparent text-[17px] leading-[22px] text-foreground placeholder:text-[#3c3c43]/35 focus:outline-none",
          className,
        )}
      />
      {hint && (
        <span id={hintId} className="mt-1 block text-[12px] text-muted-foreground">
          {hint}
        </span>
      )}
    </div>
  );
}

export function IosSearchBar({
  value,
  onChange,
  placeholder = "Search",
  label = "Search",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string | undefined;
  label?: string | undefined;
}) {
  const id = useId();
  return (
    <search>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="flex min-h-[40px] items-center gap-2 rounded-[10px] bg-[#767680]/[0.12] px-3 focus-within:ring-2 focus-within:ring-primary/40">
        <Search className="size-[17px] shrink-0 text-[#3c3c43]/60" aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          className="min-h-[36px] w-full bg-transparent text-[16px] text-foreground placeholder:text-[#3c3c43]/50 focus:outline-none"
        />
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="grid size-6 shrink-0 place-items-center rounded-full bg-[#3c3c43]/35 text-white hover:bg-[#3c3c43]/50"
          >
            <X className="size-3.5" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </search>
  );
}

/* -------------------------------------------------------------------------- */
/*  iOS Segmented Control                                                     */
/* -------------------------------------------------------------------------- */

export function IosSegmentedControl<T extends string | number>({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string | undefined;
}) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = options[(idx + 1) % options.length]!;
      onChange(next.value);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = options[(idx - 1 + options.length) % options.length]!;
      onChange(prev.value);
    }
  };

  return (
    <div role="radiogroup" aria-label={label} className={cn("ios-segmented", className)}>
      {options.map((opt, idx) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className="ios-segmented-item"
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  iOS Stepper                                                               */
/* -------------------------------------------------------------------------- */

export function IosStepper({
  value,
  min = 1,
  max = 10,
  onChange,
  label = "Quantity",
}: {
  value: number;
  min?: number | undefined;
  max?: number | undefined;
  onChange: (next: number) => void;
  label?: string | undefined;
}) {
  return (
    <div className="ios-stepper" role="group" aria-label={label}>
      <button
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="ios-stepper-btn"
      >
        −
      </button>
      <span aria-hidden="true" className="ios-stepper-divider" />
      <button
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="ios-stepper-btn"
      >
        +
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  iOS Status Badge & Empty State                                            */
/* -------------------------------------------------------------------------- */

const badgeTones: Record<string, string> = {
  Completed: "bg-[#248a3d]/12 text-[#17682c]",
  Active: "bg-[#248a3d]/12 text-[#17682c]",
  Resolved: "bg-[#248a3d]/12 text-[#17682c]",
  Approved: "bg-[#248a3d]/12 text-[#17682c]",
  Accepted: "bg-[#248a3d]/12 text-[#17682c]",
  Declined: "bg-[#d92d20]/12 text-[#b42318]",
  High: "bg-[#d92d20]/12 text-[#b42318]",
  Urgent: "bg-[#d92d20]/12 text-[#b42318]",
  Cancelled: "bg-[#767680]/15 text-[#525257]",
  Low: "bg-[#767680]/15 text-[#525257]",
};

export function IosBadge({ children }: { children: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold tracking-[-0.01em]",
        badgeTones[children] ?? "bg-[#c84e0d]/12 text-[#a83e06]",
      )}
    >
      {children}
    </span>
  );
}

export function IosEmpty({
  icon,
  title,
  children,
}: {
  icon?: ReactNode | undefined;
  title?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="ios-card flex flex-col items-center justify-center px-6 py-8 text-center">
      {icon && (
        <div
          aria-hidden="true"
          className="mb-3 grid size-11 place-items-center rounded-full bg-[#767680]/[0.1] text-muted-foreground"
        >
          {icon}
        </div>
      )}
      {title && <p className="text-[16px] font-semibold text-foreground">{title}</p>}
      <p className={cn("text-[14px] text-muted-foreground", title && "mt-1")}>{children}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  iOS Modal Bottom Sheet (UISheetPresentationController)                    */
/* -------------------------------------------------------------------------- */

export function IosSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const titleId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const prevFocus = document.activeElement as HTMLElement | null;
    sheetRef.current?.focus();

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px] animate-in fade-in duration-200"
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex max-h-[86%] w-full max-w-[430px] flex-col rounded-t-[28px] bg-[#f2f2f7] px-5 pb-6 pt-2.5 shadow-[0_-10px_40px_rgba(0,0,0,0.18)] outline-none animate-in slide-in-from-bottom duration-300"
      >
        <div aria-hidden="true" className="mx-auto mb-3 h-[5px] w-9 shrink-0 rounded-full bg-[#3c3c43]/25" />
        <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
          <h2 id={titleId} className="text-[20px] font-bold tracking-[-0.02em] text-foreground">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sheet"
            className="grid size-[30px] shrink-0 place-items-center rounded-full bg-[#767680]/[0.16] text-muted-foreground hover:bg-[#767680]/25"
          >
            <X className="size-4" strokeWidth={2.5} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-2">
          {children}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  iOS Action Sheet (UIAlertController .actionSheet)                         */
/* -------------------------------------------------------------------------- */

export function IosActionSheet({
  open,
  onClose,
  title,
  message,
  confirmLabel,
  onConfirm,
  destructive = false,
}: {
  open: boolean;
  onClose: () => void;
  title?: string | undefined;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  destructive?: boolean | undefined;
}) {
  const titleId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const prevFocus = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-3 pb-7">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[400px] space-y-2 animate-in slide-in-from-bottom duration-250"
      >
        <div className="overflow-hidden rounded-[14px] bg-[#f9f9f9]/95 backdrop-blur-xl">
          <div className="px-4 py-3.5 text-center">
            {title && (
              <p id={titleId} className="text-[13px] font-semibold text-[#3c3c43]/80">
                {title}
              </p>
            )}
            <p id={!title ? titleId : undefined} className="mt-0.5 text-[13px] leading-[18px] text-[#3c3c43]/65">
              {message}
            </p>
          </div>
          <div className="border-t border-[#3c3c43]/[0.16]">
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={cn(
                "flex min-h-[56px] w-full items-center justify-center text-[19px] font-normal transition-colors active:bg-black/[0.06]",
                destructive ? "text-[#d92d20]" : "text-primary font-medium",
              )}
            >
              {confirmLabel}
            </button>
          </div>
        </div>

        <button
          ref={cancelRef}
          type="button"
          onClick={onClose}
          className="flex min-h-[56px] w-full items-center justify-center rounded-[14px] bg-white text-[19px] font-semibold text-primary shadow-sm transition-colors active:bg-[#e5e5ea]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
