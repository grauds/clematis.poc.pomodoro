import { getMonday } from '../../utils/time';
import {
  IDayStats,
  createCurrentDayStats,
  getDayStats,
  newWeekStats,
} from '../model';

describe('Dates', () => {
  test('should fill out a week with dates', () => {
    const dateMonday = getMonday(new Date(Date.parse('2024/01/18')));
    const weekStats: IDayStats[] = newWeekStats(dateMonday);
    expect(weekStats[0].date).toEqual(new Date(Date.parse('2024/01/15')));
    expect(weekStats[1].date).toEqual(new Date(Date.parse('2024/01/16')));
    expect(weekStats[2].date).toEqual(new Date(Date.parse('2024/01/17')));
    expect(weekStats[3].date).toEqual(new Date(Date.parse('2024/01/18')));
    expect(weekStats[4].date).toEqual(new Date(Date.parse('2024/01/19')));
    expect(weekStats[5].date).toEqual(new Date(Date.parse('2024/01/20')));
    expect(weekStats[6].date).toEqual(new Date(Date.parse('2024/01/21')));
  });

  test('should fill out a week with dates 2', () => {
    const dateMonday = getMonday(new Date(Date.parse('2024/01/29')));
    const weekStats: IDayStats[] = newWeekStats(dateMonday);
    expect(weekStats[0].date).toEqual(new Date(Date.parse('2024/01/29')));
    expect(weekStats[1].date).toEqual(new Date(Date.parse('2024/01/30')));
    expect(weekStats[2].date).toEqual(new Date(Date.parse('2024/01/31')));
    expect(weekStats[3].date).toEqual(new Date(Date.parse('2024/02/1')));
    expect(weekStats[4].date).toEqual(new Date(Date.parse('2024/02/2')));
    expect(weekStats[5].date).toEqual(new Date(Date.parse('2024/02/3')));
    expect(weekStats[6].date).toEqual(new Date(Date.parse('2024/02/4')));
  });

  test('should fill out a week with dates 3', () => {
    const dateMonday = getMonday(new Date(Date.parse('2024/02/29')));
    const weekStats: IDayStats[] = newWeekStats(dateMonday);
    expect(weekStats[0].date).toEqual(new Date(Date.parse('2024/02/26')));
    expect(weekStats[1].date).toEqual(new Date(Date.parse('2024/02/27')));
    expect(weekStats[2].date).toEqual(new Date(Date.parse('2024/02/28')));
    expect(weekStats[3].date).toEqual(new Date(Date.parse('2024/02/29')));
    expect(weekStats[4].date).toEqual(new Date(Date.parse('2024/03/1')));
    expect(weekStats[5].date).toEqual(new Date(Date.parse('2024/03/2')));
    expect(weekStats[6].date).toEqual(new Date(Date.parse('2024/03/3')));
  });

  test('should create stats for a date', () => {
    const stats: IDayStats[] = [];
    const currentStats: IDayStats = createCurrentDayStats(stats);
    expect(stats.length).toBe(1);
    expect(currentStats).toEqual(stats[0]);
  });

  test('should choose stats for a date', () => {
    const stats: IDayStats[] = newWeekStats(
      getMonday(new Date(Date.parse('2024/01/18'))),
    );
    const currentStats: IDayStats | undefined = getDayStats(
      stats,
      new Date(Date.parse('2024/01/17')),
    );
    expect(stats.length).toBe(7);
    expect(currentStats).toEqual(stats[2]);

    currentStats.break += 1;
    const currentStatsModified: IDayStats | undefined = getDayStats(
      stats,
      new Date(Date.parse('2024/01/17')),
    );
    expect(currentStatsModified.break).toBe(1);
  });
});
