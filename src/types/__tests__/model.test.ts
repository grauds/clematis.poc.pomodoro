import { getMonday } from "../../utils/time";
import { IDayStats, getCurrentDayStats, getDayStats, newWeekStats } from "../model";

describe("Dates", () => {
    
  test("should fill out a week with dates", () => {
    const dateMonday = getMonday(new Date(Date.parse("2024/01/18")));
    const weekStats: IDayStats[] = newWeekStats(dateMonday);
    expect(weekStats[0].date).toEqual(new Date(Date.parse("2024/01/15")));
    expect(weekStats[1].date).toEqual(new Date(Date.parse("2024/01/16")));
    expect(weekStats[2].date).toEqual(new Date(Date.parse("2024/01/17")));
    expect(weekStats[3].date).toEqual(new Date(Date.parse("2024/01/18")));
    expect(weekStats[4].date).toEqual(new Date(Date.parse("2024/01/19")));
    expect(weekStats[5].date).toEqual(new Date(Date.parse("2024/01/20")));
    expect(weekStats[6].date).toEqual(new Date(Date.parse("2024/01/21")));
  });

  test("should create stats for a date", () => {
    const stats: IDayStats[] = [];
    const currentStats: IDayStats = getCurrentDayStats(stats);
    expect(stats.length).toBe(1);
    expect(currentStats).toEqual(stats[0]);
  });

  test("should choose stats for a date", () => {
    const stats: IDayStats[] = newWeekStats(
      getMonday(new Date(Date.parse("2024/01/18")))
    );
    const currentStats: IDayStats | undefined = getDayStats(
      stats,
      new Date(Date.parse("2024/01/17"))
    );
    expect(stats.length).toBe(7);
    expect(currentStats).toEqual(stats[2]);
  });
});
