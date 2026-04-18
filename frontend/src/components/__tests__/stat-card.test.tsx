import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { StatCard } from "../stat-card";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Total Leads" value={25} />);
    expect(screen.getByText("Total Leads")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });
});
