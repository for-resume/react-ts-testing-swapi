import React from 'react';

import { Character } from '../../App';

import classes from './ContentTable.module.css';

type ContentTableProps = {
  people: Array<Character> | [];
};

const ContentTable: React.FC<ContentTableProps> = ({
  people,
}: ContentTableProps) => (
  <table className={classes.table}>
    <tbody>
      <tr>
        <th>Имя</th>
        <th>Пол</th>
        <th>Вес</th>
        <th>Цвет глаз</th>
      </tr>

      {people.length ? (
        people.map(({ name, gender, mass, eye_color }: Character) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{gender}</td>
            <td>{mass}</td>
            <td>{eye_color}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>Нет данных</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default ContentTable;
