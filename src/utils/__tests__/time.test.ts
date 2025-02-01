import { EWeek, IDayStats, IWeek, getWeekDays } from '../../types/model';
import {
  getMonday,
  getPreviousMonday,
  getMondayTwoWeeksAgo,
  getDay,
} from '../time';

describe('Dates', () => {
  test('should get the current week Monday', () => {
    const dateMonday = getMonday(new Date(Date.parse('2024/01/18')));
    expect(dateMonday).toEqual(new Date(Date.parse('2024/01/15')));
  });

  test('should get the current week Monday going over month border', () => {
    const dateMonday = getMonday(new Date(Date.parse('2024/02/01')));
    expect(dateMonday).toEqual(new Date(Date.parse('2024/01/29')));
  });

  test('should get the current week Monday when Sunday', () => {
    const dateMonday = getMonday(new Date(Date.parse('2024/01/21')));
    expect(dateMonday).toEqual(new Date(Date.parse('2024/01/15')));
  });

  test('should get the previous week Monday when Sunday', () => {
    const dateMonday = getPreviousMonday(new Date(Date.parse('2024/01/21')));
    expect(dateMonday).toEqual(new Date(Date.parse('2024/01/08')));
  });

  test('should get the two weeks ago Monday when Sunday', () => {
    const dateMonday = getMondayTwoWeeksAgo(new Date(Date.parse('2024/01/21')));
    expect(dateMonday).toEqual(new Date(Date.parse('2024/01/01')));
  });

  test('should count days from Monday, zero based', () => {
    let date = new Date(Date.parse('2024/01/18'));
    let i = getDay(date);
    expect(i).toBe(3);

    date = new Date(Date.parse('2024/01/17'));
    i = getDay(date);
    expect(i).toBe(2);

    date = new Date(Date.parse('2024/01/16'));
    i = getDay(date);
    expect(i).toBe(1);

    date = new Date(Date.parse('2024/01/15'));
    i = getDay(date);
    expect(i).toBe(0);

    date = new Date(Date.parse('2024/01/19'));
    i = getDay(date);
    expect(i).toBe(4);

    date = new Date(Date.parse('2024/01/20'));
    i = getDay(date);
    expect(i).toBe(5);

    date = new Date(Date.parse('2024/01/21'));
    i = getDay(date);
    expect(i).toBe(6);
  });

  test('get week days', () => {
    const week: IWeek = {
      id: EWeek.THIS_WEEK,
      text: '',
    };
    const weekDays: IDayStats[] = getWeekDays(week);
    expect(weekDays.length).toBe(7);
    expect(weekDays[0].short).toBe('Пн');
    expect(weekDays[1].short).toBe('Вт');
    expect(weekDays[2].short).toBe('Ср');
    expect(weekDays[3].short).toBe('Чт');
    expect(weekDays[4].short).toBe('Пт');
    expect(weekDays[5].short).toBe('Сб');
    expect(weekDays[6].short).toBe('Вс');
  });
});
