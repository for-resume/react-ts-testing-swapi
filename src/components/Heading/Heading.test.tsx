import React from 'react';
import { render, screen } from '@testing-library/react';

import Heading from './Heading';

describe('Heading', () => {
  it('renders with correctly text', () => {
    render(<Heading title="Test Heading" />);
    expect(screen.getByRole('heading')).toHaveTextContent('Test Heading');
  });

  it('renders text "Заголовок" if title is empty', () => {
    render(<Heading title="" />);
    expect(screen.getByRole('heading')).toHaveTextContent('Заголовок');
  });
});
