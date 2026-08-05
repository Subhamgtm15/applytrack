import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Briefcase } from "lucide-react";
import StatCard from "./StatCard";

describe("StatCard", () => {
  it("renders the title, value and subtitle", () => {
    render(
      <StatCard
        title="Total Applied"
        value={42}
        subtitle="up this week"
        icon={Briefcase}
      />
    );

    expect(screen.getByText("Total Applied")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("up this week")).toBeInTheDocument();
  });
});
