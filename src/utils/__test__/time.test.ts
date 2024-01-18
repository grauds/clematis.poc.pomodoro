import { getMonday, getPreviousMonday, getMondayTwoWeeksAgo } from "../time";

describe("Dates", () => {
  test("should get the current week Monday", () => {
    const dateMonday = getMonday(new Date(Date.parse("2024/01/18")));
    expect(dateMonday).toEqual(new Date(Date.parse("2024/01/15")));
  });

  test("should get the current week Monday going over month border", () => {
    const dateMonday = getMonday(new Date(Date.parse("2024/02/01")));
    expect(dateMonday).toEqual(new Date(Date.parse("2024/01/29")));
  });

  test("should get the current week Monday when Sunday", () => {
    const dateMonday = getMonday(new Date(Date.parse("2024/01/21")));
    expect(dateMonday).toEqual(new Date(Date.parse("2024/01/15")));
  });

  test("should get the previous week Monday when Sunday", () => {
    const dateMonday = getPreviousMonday(new Date(Date.parse("2024/01/21")));
    expect(dateMonday).toEqual(new Date(Date.parse("2024/01/08")));
  });

  test("should get the two weeks ago Monday when Sunday", () => {
    const dateMonday = getMondayTwoWeeksAgo(new Date(Date.parse("2024/01/21")));
    expect(dateMonday).toEqual(new Date(Date.parse("2024/01/01")));
  });

});
