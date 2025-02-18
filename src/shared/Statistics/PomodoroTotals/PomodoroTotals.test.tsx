import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PomodoroTotals } from './PomodoroTotals';

jest.mock('../../icons', () => ({
  PomodoroIcon: jest.fn(() => <div>PomodoroIcon</div>),
  PomodoroSmallIcon: jest.fn(() => <div>PomodoroSmallIcon</div>),
}));

describe('PomodoroTotals', () => {
  it('renders PomodoroIcon when pomodoro is undefined', () => {
    const { getByText } = render(<PomodoroTotals />);
    expect(getByText('PomodoroIcon')).toBeInTheDocument();
  });

  it('renders PomodoroIcon when pomodoro is 0', () => {
    const { getByText } = render(<PomodoroTotals pomodoro={0} />);
    expect(getByText('PomodoroIcon')).toBeInTheDocument();
  });

  it('renders PomodoroSmallIcon and pomodoro count when pomodoro is greater than 0', () => {
    const { getByText } = render(<PomodoroTotals pomodoro={5} />);
    expect(getByText('PomodoroSmallIcon')).toBeInTheDocument();
    expect(getByText('x 5')).toBeInTheDocument();
  });

  it('renders footer with pomodoro count when pomodoro is greater than 0', () => {
    const { getByText } = render(<PomodoroTotals pomodoro={3} />);
    expect(getByText('3 помидор')).toBeInTheDocument();
  });

  it('does not render footer when pomodoro is undefined or 0', () => {
    const { queryByText } = render(<PomodoroTotals />);
    expect(queryByText(/помидор/)).not.toBeInTheDocument();

    const { queryByText: queryByTextZero } = render(
      <PomodoroTotals pomodoro={0} />,
    );
    expect(queryByTextZero(/помидор/)).not.toBeInTheDocument();
  });
});
