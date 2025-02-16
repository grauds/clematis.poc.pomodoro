import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FocusTotals } from './FocusTotals';

import { TargetIcon } from '../../icons';
import styles from './focustotals.css';

jest.mock('../../icons', () => ({
    TargetIcon: jest.fn(() => <div>Mocked TargetIcon</div>),
}));

describe('FocusTotals', () => {
    it('renders without crashing', () => {
        const { container } = render(<FocusTotals />);
        expect(container).toBeInTheDocument();
    });

    it('displays the correct percentage', () => {
        const { getByText } = render(<FocusTotals percent={75} />);
        expect(getByText('75%')).toBeInTheDocument();
    });

    it('displays 0% when percent is not provided', () => {
        const { getByText } = render(<FocusTotals />);
        expect(getByText('0%')).toBeInTheDocument();
    });

    it('applies active class when percent is greater than 0', () => {
        const { container } = render(<FocusTotals percent={50} />);
        expect(container.firstChild).toHaveClass(styles.active);
    });

    it('does not apply active class when percent is 0 or less', () => {
        const { container } = render(<FocusTotals percent={0} />);
        expect(container.firstChild).not.toHaveClass(styles.active);
    });

    it('renders TargetIcon with active prop correctly', () => {
        render(<FocusTotals percent={50} />);
        expect(TargetIcon).toHaveBeenCalledWith({ active: true }, {});
    });

    it('renders TargetIcon with inactive prop correctly', () => {
        render(<FocusTotals percent={0} />);
        expect(TargetIcon).toHaveBeenCalledWith({ active: false }, {});
    });
});