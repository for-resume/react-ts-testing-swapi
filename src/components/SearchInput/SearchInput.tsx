import React, { useRef, useEffect, useState } from 'react';

import classes from './SearchInput.module.css';

import { URL } from '../../App';

type SearchInputProps = {
  fetchAndSetData: (url?: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  fetchAndSetData,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputTouched, setIsInputTouched] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAndSetData();
    searchInputRef.current?.focus();
  }, [searchInputRef, fetchAndSetData]);

  useEffect(() => {
    if (!isInputTouched) {
      return;
    }

    const timerId = setTimeout(() => {
      const searchOption = inputValue ? `?search=${inputValue}` : '';
      fetchAndSetData(`${URL}${searchOption}`);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue, isInputTouched, fetchAndSetData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isInputTouched) {
      setIsInputTouched(true);
    }
    setInputValue(e.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <label className={classes.label} htmlFor="serchPeople">
        Найти:
      </label>
      <input
        data-testid="input"
        ref={searchInputRef}
        id="serchPeople"
        className={classes.input}
        type="text"
        placeholder="Luke Skywalker"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default React.memo(SearchInput);
