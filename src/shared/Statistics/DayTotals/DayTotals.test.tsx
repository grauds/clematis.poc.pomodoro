import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DayTotals } from "./DayTotals";
import { IDayStats } from "../../../types/model";

describe("DayTotals Component", () => {
  const mockDay: IDayStats = {
    name: "Monday",
    date: new Date("2023-10-10"),
    time: 120,
    pause: 10,
    break: 5,
    stops: 2,
    short: '1',
  };

  it("should render the day name and date correctly", () => {
    const { getByText } = render(<DayTotals day={mockDay} time="120" />);
    expect(getByText("Monday (10/10/2023)")).toBeInTheDocument();
  });

  it("should render the time worked correctly", () => {
    const { getByText } = render(<DayTotals day={mockDay} time="120" />);
    expect(getByText("Вы работали над задачами в течение")).toBeInTheDocument();
    expect(getByText("120")).toBeInTheDocument();
  });

  it("should apply the correct styles", () => {
    const { container } = render(<DayTotals day={mockDay} time="120" />);
    expect(container.firstChild).toHaveClass("daytotals");
    expect(container.querySelector(".header")).toBeInTheDocument();
    expect(container.querySelector(".description")).toBeInTheDocument();
    expect(container.querySelector(".minutes")).toBeInTheDocument();
  });
});
