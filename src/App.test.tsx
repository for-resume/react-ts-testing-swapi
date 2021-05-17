import React from 'react';
import { findByText, render, screen } from '@testing-library/react';

import App from './App';

async function mockFetchSuccess() {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      count: 82,
      next: 'http://swapi.dev/api/people/?page=2',
      previous: null,
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'http://swapi.dev/api/planets/1/',
          films: [
            'http://swapi.dev/api/films/1/',
            'http://swapi.dev/api/films/2/',
            'http://swapi.dev/api/films/3/',
            'http://swapi.dev/api/films/6/',
          ],
          species: [],
          vehicles: [
            'http://swapi.dev/api/vehicles/14/',
            'http://swapi.dev/api/vehicles/30/',
          ],
          starships: [
            'http://swapi.dev/api/starships/12/',
            'http://swapi.dev/api/starships/22/',
          ],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'http://swapi.dev/api/people/1/',
        },
        {
          name: 'C-3PO',
          height: '167',
          mass: '75',
          hair_color: 'n/a',
          skin_color: 'gold',
          eye_color: 'yellow',
          birth_year: '112BBY',
          gender: 'n/a',
          homeworld: 'http://swapi.dev/api/planets/1/',
          films: [
            'http://swapi.dev/api/films/1/',
            'http://swapi.dev/api/films/2/',
            'http://swapi.dev/api/films/3/',
            'http://swapi.dev/api/films/4/',
            'http://swapi.dev/api/films/5/',
            'http://swapi.dev/api/films/6/',
          ],
          species: ['http://swapi.dev/api/species/2/'],
          vehicles: [],
          starships: [],
          created: '2014-12-10T15:10:51.357000Z',
          edited: '2014-12-20T21:17:50.309000Z',
          url: 'http://swapi.dev/api/people/2/',
        },
      ],
    }),
  };
}

async function mockFetchFail() {
  return {
    ok: false,
    json: async () => ({ detail: 'Not Found' }),
  };
}

describe('App', () => {
  it('renders loading message without table of data and errors initially', () => {
    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByText(/ошибка/i)).not.toBeInTheDocument();
  });

  it('renders rows if fetching succeed and not loading and error message', async () => {
    const mockFetch = jest.spyOn(window, 'fetch') as jest.Mock;
    mockFetch.mockImplementation(mockFetchSuccess);

    render(<App />);

    const rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(3);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ошибка/i)).not.toBeInTheDocument();
  });

  it('renders error if fetching failed without table and loading message', async () => {
    const mockFetch = jest.spyOn(window, 'fetch') as jest.Mock;
    mockFetch.mockImplementation(mockFetchFail);

    render(<App />);

    await screen.findByText(/ошибка/i);

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
