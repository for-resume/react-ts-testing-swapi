import React from 'react';
import { render } from '@testing-library/react';

import ContentTable from './ContentTable';

describe('ContentTable', () => {
  it('matches snapshot if people not empty', () => {
    const { asFragment } = render(
      <ContentTable
        people={[
          {
            name: 'Luke Skywalker',
            gender: 'male',
            mass: '77',
            eye_color: 'blue',
          },
          {
            name: 'C-3PO',
            gender: 'n/a',
            mass: '75',
            eye_color: 'yellow',
          },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot if people - empty []', () => {
    const { asFragment } = render(<ContentTable people={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
