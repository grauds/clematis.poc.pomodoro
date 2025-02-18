import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PauseTotals } from "./PauseTotals";

import { formatMinsShort } from "../../../utils/time";
import { ClockIcon } from "../../icons";

jest.mock("../../../utils/time");
jest.mock("../../icons");

describe("PauseTotals", () => {
  beforeEach(() => {
    (formatMinsShort as jest.Mock).mockReturnValue("10m");
    (ClockIcon as jest.Mock).mockImplementation(({ active }) => (
      <div data-testid="clock-icon">{active ? "Active" : "Inactive"}</div>
    ));
  });

  it("renders correctly with time", () => {
    const { getByText, getByTestId } = render(<PauseTotals time={10} />);

    expect(getByText("Время на паузе")).toBeInTheDocument();
    expect(getByText("10m")).toBeInTheDocument();
    expect(getByTestId("clock-icon")).toHaveTextContent("Active");
  });

  it("renders correctly without time", () => {
    const { getByText, getByTestId } = render(<PauseTotals time={0} />);

    expect(getByText("Время на паузе")).toBeInTheDocument();
    expect(getByText("10m")).toBeInTheDocument();
    expect(getByTestId("clock-icon")).toHaveTextContent("Inactive");
  });

  it("applies active class when time is greater than 0", () => {
    const { container } = render(<PauseTotals time={10} />);
    expect(container.firstChild).toHaveClass("active");
  });

  it("does not apply active class when time is 0", () => {
    const { container } = render(<PauseTotals time={0} />);
    expect(container.firstChild).not.toHaveClass("active");
  });
});
