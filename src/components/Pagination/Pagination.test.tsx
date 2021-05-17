import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pagination, { PaginationProps } from './Pagination';

const setUp = (props: PaginationProps) => <Pagination {...props} />;

const fetchAndSetData = jest.fn();

describe('Pagination', () => {
  it('renders text with correct count', () => {
    render(
      setUp({
        count: 6,
        next: 'next/url',
        previous: 'prev/url',
        fetchAndSetData,
      }),
    );

    expect(screen.getByText(/Всего: 6/i)).toBeInTheDocument();
  });

  describe('buttons', () => {
    it('should be disabled if props are null', () => {
      render(
        setUp({
          count: 6,
          next: null,
          previous: null,
          fetchAndSetData,
        }),
      );

      expect(screen.getByTestId('prevBtn')).toBeDisabled();
      expect(screen.getByTestId('nextBtn')).toBeDisabled();
    });

    it('should be enabled if props are strings', () => {
      render(
        setUp({
          count: 6,
          next: 'next/url',
          previous: 'prev/url',
          fetchAndSetData,
        }),
      );

      expect(screen.getByTestId('prevBtn')).not.toBeDisabled();
      expect(screen.getByTestId('nextBtn')).not.toBeDisabled();
    });

    it('should be disabled or enabled for exact button', () => {
      render(
        setUp({
          count: 6,
          next: null,
          previous: 'prev/url',
          fetchAndSetData,
        }),
      );

      expect(screen.getByTestId('prevBtn')).not.toBeDisabled();
      expect(screen.getByTestId('nextBtn')).toBeDisabled();
    });

    it('should trigger fetchAndSetData with correct param if url is a string', () => {
      render(
        setUp({
          count: 6,
          next: 'next/url',
          previous: 'prev/url',
          fetchAndSetData,
        }),
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        userEvent.click(button);
        if (button.getAttribute('data-testid') === 'prevBtn') {
          expect(fetchAndSetData).lastCalledWith('prev/url');
        } else if (button.getAttribute('data-testid') === 'nextBtn') {
          expect(fetchAndSetData).lastCalledWith('next/url');
        }
      });

      expect(fetchAndSetData).toBeCalledTimes(2);
    });

    // тест ниже работает не так, как хотелось бы, из-за disabled кнопки
    // клик невозможно вызвать и условие в обработчике не проверятеся
    // скорее всего надо удалить disabled атрибут напрямую
    // (как это мог сделать потенциальный User через dev-tools),
    // но все попытки были безуспешны
    it('should NOT trigger fetchAndSetData if url is null', () => {
      render(
        setUp({
          count: 6,
          next: null,
          previous: null,
          fetchAndSetData,
        }),
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        fireEvent.click(button);
        expect(fetchAndSetData).toBeCalledTimes(0);
      });
    });
  });
});
