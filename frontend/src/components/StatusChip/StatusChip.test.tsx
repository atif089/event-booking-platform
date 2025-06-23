import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusChip from "./index";

describe("StatusChip", () => {
  it("renders Active when enabled is true", () => {
    render(<StatusChip enabled={true} />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders Inactive when enabled is false", () => {
    render(<StatusChip enabled={false} />);
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("has active classes when enabled is true", () => {
    render(<StatusChip enabled={true} />);
    const chip = screen.getByText("Active");
    expect(chip).toHaveClass("bg-green-100 text-green-800");
  });

  it("has inactive classes when enabled is false", () => {
    render(<StatusChip enabled={false} />);
    const chip = screen.getByText("Inactive");
    expect(chip).toHaveClass("bg-red-100 text-red-800");
  });
});
