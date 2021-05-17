import React, { useState, useCallback } from 'react';

import SearchInput from './components/SearchInput/SearchInput';
import ContentTable from './components/ContentTable/ContentTable';
import Pagination from './components/Pagination/Pagination';
import Heading from './components/Heading/Heading';

import classes from './App.module.css';

export const URL = 'https://swapi.dev/api/people/';

export type Character = {
  name: string;
  gender: string;
  mass: string;
  eye_color: string;
};

type FetchedData = {
  results: Array<Character> | [];
  count: number;
  next: string | null;
  previous: string | null;
};

const App: React.FC = () => {
  const [peopleData, setPeopleData] = useState<FetchedData>({
    results: [],
    count: 0,
    next: null,
    previous: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAndSetData = useCallback(async (url = URL) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const { results, count, next, previous } = data;
        const newResults = results.map(
          ({ name, gender, mass, eye_color }: Character) => ({
            name,
            gender,
            mass,
            eye_color,
          }),
        );

        setPeopleData({ results: newResults, count, next, previous });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error(data.detail);
      }
    } catch (error) {
      setErrorMessage(`Возникла ошибка - ${error.message}`);
      setIsLoading(false);
    }
  }, []);

  const renderContent = () => {
    return (
      <React.Fragment>
        {isLoading ? (
          <p className={classes.message}>Loading...</p>
        ) : (
          <React.Fragment>
            <Pagination
              count={peopleData.count}
              next={peopleData.next}
              previous={peopleData.previous}
              fetchAndSetData={fetchAndSetData}
            />
            <ContentTable people={peopleData.results} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className={classes.wrapper}>
      <Heading title="Люди вселенной Star Wars" />

      {errorMessage ? (
        <p className={classes.message}>{errorMessage}</p>
      ) : (
        <React.Fragment>
          <SearchInput fetchAndSetData={fetchAndSetData} />
          {renderContent()}
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
