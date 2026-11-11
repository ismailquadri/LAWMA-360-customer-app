import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocalVoiceAgent } from "@/components/LocalVoiceAgent";
import { PartnerLogo } from "@/components/PartnerLogo";
import { StickyVoiceFab } from "@/components/StickyVoiceFab";
import { partners } from "@/lib/customer-model";
import { StoreProvider } from "@/lib/store";
import { buildDialectReport, DIALECTS } from "@/lib/voice-agent";

describe("Partner logos", () => {
  it("renders a distinct vector SVG mark for every licensed partner", () => {
    const svgs = partners.map((p) => {
      const { container, unmount } = render(
        <PartnerLogo partnerId={p.id} name={p.name} decorative={false} />,
      );
      const svg = container.querySelector("svg");
      const markup = svg?.innerHTML ?? "";
      expect(svg).toHaveAttribute("aria-label", `${p.name} logo`);
      unmount();
      return markup;
    });

    // Ensure every partner logo has unique artwork/gradient stops
    expect(new Set(svgs).size).toBe(partners.length);
  });
});

describe("Local dialect voice agent", () => {
  it("translates and routes illegal dumping and drain blockages across Nigerian dialects", () => {
    const yoDraft = buildDialectReport(
      "Àwọn èèyàn ń dà ìdọ̀tí sí etí kòtò omi ní Olowu Street, ó ti dí ojú agbami.",
      "yo",
      { address: "18 Olowu Street", area: "Ikeja" },
    );
    expect(yoDraft.category).toBe("Blocked drain");
    expect(yoDraft.urgency).toBe("high");
    expect(yoDraft.sendTo).toEqual(["lawma"]);
    expect(yoDraft.report).toContain("Near 18 Olowu Street, Ikeja");
    expect(yoDraft.report).toContain("Original Yorùbá transcript:");

    const igDraft = buildDialectReport(
      "A tụfuru nnukwu ahịhịa n’akụkụ ụzọ anyị, ọ na-egbochi ndị mmadụ ịgafe.",
      "ig",
    );
    expect(igDraft.category).toBe("Illegal dumping");
    expect(igDraft.sendTo).toEqual(["lawma"]);

    const haDraft = buildDialectReport(
      "Mutane suna zubar da shara a bakin magudanar ruwa a Ajah.",
      "ha",
    );
    expect(haDraft.category).toBe("Blocked drain");
    expect(haDraft.sendTo).toEqual(["lawma"]);
  });

  it("lets residents switch dialects, tap a sample phrase, and prepare a dispatch report", () => {
    const onDraftReady = vi.fn();
    render(<LocalVoiceAgent address="18 Olowu Street" area="Ikeja" onDraftReady={onDraftReady} />);

    // Switch to Yorùbá dialect
    fireEvent.click(screen.getByRole("radio", { name: "Yorùbá" }));
    expect(screen.getByText(/Èdè Yorùbá/i)).toBeInTheDocument();

    // Tap first Yorùbá sample phrase
    const yoSample = DIALECTS.find((d) => d.code === "yo")!.samples[0]!;
    fireEvent.click(screen.getByRole("button", { name: new RegExp(yoSample.label) }));

    // Trigger translation into report draft
    fireEvent.click(screen.getByRole("button", { name: /Translate & prepare LAWMA report/i }));
    expect(onDraftReady).toHaveBeenCalledTimes(1);
    const [draft] = onDraftReady.mock.calls[0]!;
    expect(draft.category).toBe("Blocked drain");
    expect(draft.sendTo).toEqual(["lawma"]);
  });

  it("opens the floating sticky voice icon sheet and submits an illegal dumping report", () => {
    render(
      <StoreProvider>
        <StickyVoiceFab />
      </StoreProvider>,
    );

    const orb = screen.getByRole("button", {
      name: /Open local dialect voice reporting assistant/i,
    });
    fireEvent.click(orb);

    const sheet = screen.getByRole("dialog", { name: "Local Voice Agent" });
    expect(sheet).toBeInTheDocument();

    const pidginSample = DIALECTS[0]!.samples[0]!;
    fireEvent.click(screen.getByRole("button", { name: new RegExp(pidginSample.label) }));
    fireEvent.click(screen.getByRole("button", { name: /Translate & prepare LAWMA report/i }));

    expect(screen.getByRole("dialog", { name: "Review voice report" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Send report" }));

    expect(screen.getByRole("dialog", { name: "Report submitted" })).toBeInTheDocument();
    expect(screen.getByText(/Sent to dispatch/i)).toBeInTheDocument();
  });
});
