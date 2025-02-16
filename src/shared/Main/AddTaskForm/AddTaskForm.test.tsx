import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AddTaskForm } from './AddTaskForm';

describe('AddTaskForm', () => {
    test('renders input and button', () => {
        render(<AddTaskForm onSubmit={jest.fn()} />);
        expect(screen.getByPlaceholderText('Название задачи')).toBeInTheDocument();
        expect(screen.getByText('Добавить')).toBeInTheDocument();
    });

    test('focuses input on mount', () => {
        render(<AddTaskForm onSubmit={jest.fn()} />);
        const input = screen.getByPlaceholderText('Название задачи');
        expect(input).toHaveFocus();
    });

    test('shows error message if task name is less than 3 characters', () => {
        render(<AddTaskForm onSubmit={jest.fn()} />);
        const input = screen.getByPlaceholderText('Название задачи');
        const button = screen.getByText('Добавить');

        fireEvent.change(input, { target: { value: 'ab' } });
        fireEvent.click(button);

        expect(screen.getByText('Введите не меньше трех символов для новой задачи')).toBeInTheDocument();
    });

    test('calls onSubmit with task name if form is valid', () => {
        const handleSubmit = jest.fn();
        render(<AddTaskForm onSubmit={handleSubmit} />);
        const input = screen.getByPlaceholderText('Название задачи');
        const button = screen.getByText('Добавить');

        fireEvent.change(input, { target: { value: 'Valid Task' } });
        fireEvent.click(button);

        expect(handleSubmit).toHaveBeenCalledWith('Valid Task');
    });

    test('does not call onSubmit if form is invalid', () => {
        const handleSubmit = jest.fn();
        render(<AddTaskForm onSubmit={handleSubmit} />);
        const input = screen.getByPlaceholderText('Название задачи');
        const button = screen.getByText('Добавить');

        fireEvent.change(input, { target: { value: 'ab' } });
        fireEvent.click(button);

        expect(handleSubmit).not.toHaveBeenCalled();
    });
});