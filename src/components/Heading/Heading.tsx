import React from 'react';

import classes from './Heading.module.css';

type HeadingProps = {
  title: string;
};

const Heading: React.FC<HeadingProps> = ({ title }: HeadingProps) => (
  <h1 className={classes.title}>{title ? title : 'Заголовок'}</h1>
);
export default React.memo(Heading);
