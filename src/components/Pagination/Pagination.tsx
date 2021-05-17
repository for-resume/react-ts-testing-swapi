import React from 'react';

import classes from './Pagination.module.css';

export type PaginationProps = {
  fetchAndSetData: (url: string) => void;
  previous: string | null;
  next: string | null;
  count: number;
};

const Pagination: React.FC<PaginationProps> = ({
  fetchAndSetData,
  previous,
  next,
  count,
}: PaginationProps) => {
  const handlePrevClick = () => {
    if (previous) {
      fetchAndSetData(previous);
    }
  };

  const handleNextClick = () => {
    if (next) {
      fetchAndSetData(next);
    }
  };

  return (
    <div className={classes.wrapper}>
      <button
        data-testid="prevBtn"
        onClick={handlePrevClick}
        className={classes.btn}
        disabled={!previous}
      >
        &lt;
      </button>
      <p className={classes.foundCount}>Всего: {count}</p>
      <button
        data-testid="nextBtn"
        onClick={handleNextClick}
        className={classes.btn}
        disabled={!next}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
