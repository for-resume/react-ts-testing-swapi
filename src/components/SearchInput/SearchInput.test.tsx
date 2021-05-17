import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchInput from './SearchInput';
import { URL } from '../../App';

const fetchAndSetData = jest.fn();

describe('SearchInput', () => {
  describe('renders', () => {
    it('label with text "найти"', () => {
      render(<SearchInput fetchAndSetData={fetchAndSetData} />);
      expect(screen.getByText(/найти/i)).toBeInTheDocument();
    });

    it('input', () => {
      render(<SearchInput fetchAndSetData={fetchAndSetData} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('event', () => {
    it('"change" changes value of input correctly', () => {
      render(<SearchInput fetchAndSetData={fetchAndSetData} />);
      const inputEl = screen.getByRole('textbox') as HTMLInputElement;

      expect(inputEl.value).toBe('');
      userEvent.type(inputEl, 'Luke Sky');
      expect(inputEl.value).toBe('Luke Sky');
    });

    it('"focus" calls initially', () => {
      render(<SearchInput fetchAndSetData={fetchAndSetData} />);
      const inputEl = screen.getByRole('textbox') as HTMLInputElement;

      expect(inputEl).toHaveFocus();
    });
  });

  it('calls fetchAndSetData with correct param initially', () => {
    render(<SearchInput fetchAndSetData={fetchAndSetData} />);
    expect(fetchAndSetData).toBeCalledWith();
    expect(fetchAndSetData).toBeCalledTimes(1);
  });

  it('calls fetchAndSetData only once initially even after 1 second', () => {
    jest.useFakeTimers();
    render(<SearchInput fetchAndSetData={fetchAndSetData} />);

    jest.advanceTimersByTime(1000);

    expect(fetchAndSetData).toBeCalledTimes(1);
  });

  it('calls fetchAndSetData after 1s of changing input with correct param', async () => {
    jest.useFakeTimers();

    render(<SearchInput fetchAndSetData={fetchAndSetData} />);
    const inputEl = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.type(inputEl, 'Luke');

    jest.advanceTimersByTime(999);

    expect(fetchAndSetData).toBeCalledTimes(1);
    expect(fetchAndSetData).lastCalledWith();

    jest.advanceTimersByTime(2);

    expect(fetchAndSetData).toBeCalledTimes(2);
    expect(fetchAndSetData).lastCalledWith(`${URL}?search=Luke`);
  });

  it('calls fetchAndSetData with 0 arguments if current input value is empty after change', () => {
    jest.useFakeTimers();

    render(<SearchInput fetchAndSetData={fetchAndSetData} />);
    const inputEl = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.type(inputEl, 'Luke');

    fireEvent.change(inputEl, { target: { value: '' } });

    jest.advanceTimersByTime(1000);

    expect(fetchAndSetData).toBeCalledTimes(2);
    expect(fetchAndSetData).lastCalledWith(`${URL}`);
  });
});
