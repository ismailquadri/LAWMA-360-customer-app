import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  IosActionSheet,
  IosSegmentedControl,
  IosSheet,
  IosStepper,
} from "@/components/ios";

describe("iOS design system components", () => {
  it("switches segmented control selections via click and arrow keys", () => {
    const onChange = vi.fn();
    render(
      <IosSegmentedControl
        label="Capacity"
        value={120}
        onChange={onChange}
        options={[
          { value: 120, label: "120L" },
          { value: 240, label: "240L" },
          { value: 360, label: "360L" },
        ]}
      />,
    );

    const radio240 = screen.getByRole("radio", { name: "240L" });
    fireEvent.click(radio240);
    expect(onChange).toHaveBeenCalledWith(240);

    const radio120 = screen.getByRole("radio", { name: "120L" });
    fireEvent.keyDown(radio120, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith(240);
  });

  it("enforces min and max bounds in IosStepper", () => {
    const onChange = vi.fn();
    render(<IosStepper value={1} min={1} max={3} onChange={onChange} label="Bin quantity" />);

    const dec = screen.getByRole("button", { name: "Decrease bin quantity" });
    const inc = screen.getByRole("button", { name: "Increase bin quantity" });
    expect(dec).toBeDisabled();
    expect(inc).not.toBeDisabled();

    fireEvent.click(inc);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("renders accessible IosSheet and closes on Escape", () => {
    const onClose = vi.fn();
    render(
      <IosSheet open onClose={onClose} title="Add money">
        <p>Sheet content</p>
      </IosSheet>,
    );

    const dialog = screen.getByRole("dialog", { name: "Add money" });
    expect(dialog).toHaveAttribute("aria-modal", "true");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders destructive IosActionSheet and runs confirmation or cancel", () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    render(
      <IosActionSheet
        open
        onClose={onClose}
        title="Reset?"
        message="This clears local data."
        confirmLabel="Reset Now"
        onConfirm={onConfirm}
        destructive
      />,
    );

    expect(screen.getByRole("alertdialog")).toHaveAttribute("aria-modal", "true");
    fireEvent.click(screen.getByRole("button", { name: "Reset Now" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
