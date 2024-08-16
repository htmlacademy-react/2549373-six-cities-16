import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Textarea from './textarea';

describe('Textarea Component', () => {
  it('should render with correct initial value and placeholder', () => {
    const mockValue = 'Test value';
    const mockPlaceholder = 'Enter your review here';
    const handleChange = vi.fn();

    render(<Textarea value={mockValue} onChange={handleChange} isDisabled={false} placeholder={mockPlaceholder}/>);

    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveValue(mockValue);
    expect(textareaElement).toHaveAttribute('placeholder', mockPlaceholder);
  });

  it('should be disabled when isDisabled is true', () => {
    const handleChange = vi.fn();

    render(<Textarea value="" onChange={handleChange} isDisabled/>);

    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toBeDisabled();
  });

  it('should call onChange handler when value changes', () => {
    const handleChange = vi.fn();
    const mockValue = 'Test value';

    render(<Textarea value={mockValue} onChange={handleChange} isDisabled={false}/>);

    const textareaElement = screen.getByRole('textbox');
    fireEvent.change(textareaElement, { target: { value: 'New value' } });

    expect(handleChange).toHaveBeenCalled();
  });
});
