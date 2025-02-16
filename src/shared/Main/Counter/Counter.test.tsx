import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Counter, ICounterProps } from './Counter';

describe('Counter Component', () => {
    const defaultProps: ICounterProps = {
        active: true,
        name: 'Test Counter',
        status: 'Running',
        pomodoroNo: 1,
        seconds: 1500,
        titleCss: 'titleCss',
        secondsCss: 'secondsCss',
        bodyCss: 'bodyCss',
        leftButtonTitle: 'Start',
        leftButtonAction: jest.fn(),
        rightButtonTitle: 'Stop',
        rightBuittonAction: jest.fn(),
        rightButtonDisabled: false,
        handleTimeAdd: jest.fn(),
    };

    it('renders Counter component with active state', () => {
        render(<Counter {...defaultProps} />);
        expect(screen.getByText('Test Counter')).toBeInTheDocument();
        expect(screen.getByText('Running')).toBeInTheDocument();
        expect(screen.getByText('Start')).toBeInTheDocument();
        expect(screen.getByText('Stop')).toBeInTheDocument();
    });

    it('calls leftButtonAction when left button is clicked', () => {
        render(<Counter {...defaultProps} />);
        fireEvent.click(screen.getByText('Start'));
        expect(defaultProps.leftButtonAction).toHaveBeenCalled();
    });

    it('calls rightBuittonAction when right button is clicked', () => {
        render(<Counter {...defaultProps} />);
        fireEvent.click(screen.getByText('Stop'));
        expect(defaultProps.rightBuittonAction).toHaveBeenCalled();
    });

    it('disables right button when rightButtonDisabled is true', () => {
        render(<Counter {...defaultProps} rightButtonDisabled={true} />);
        expect(screen.getByText('Stop')).toBeDisabled();
    });

    it('calls handleTimeAdd when plus button is clicked', () => {
        render(<Counter {...defaultProps} />);
        fireEvent.click(screen.getByRole('button', { name: 'timeAdd'}));
        expect(defaultProps.handleTimeAdd).toHaveBeenCalled();
    });

    it('renders Counter component with inactive state', () => {
        render(<Counter {...defaultProps} active={false} />);
        expect(screen.queryByText('Running')).not.toBeInTheDocument();
        expect(screen.queryByText('Start')).not.toBeInTheDocument();
        expect(screen.queryByText('Stop')).not.toBeInTheDocument();
    });
});