import React, { KeyboardEvent } from 'react';
import './Subcategories.css';

interface ISubcategoriesProps {
  name: string;
  value: string[];
  placeholder: string;
  onAddValue: (value: string) => void;
  onDeleteValue: (index: number) => void;
}

const Subcategories = ({
  name,
  value,
  placeholder,
  onAddValue,
  onDeleteValue,
}: ISubcategoriesProps) => {
  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (input.value.trim().length > 0) {
      onAddValue(input.value.trim());
      input.value = '';
    }
  };

  const onKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      addTags(evt);
    }
  };

  return (
    <div className="subcategories" data-testid="value-input">
      <input
        className="subcategories__input _input"
        type="text"
        onKeyDown={onKeyDownHandler}
        placeholder={placeholder}
        name={name}
        id={name}
      />
      <ul className="subcategories__list list-subcategories">
        {value.map((el, index) => (
          <li
            key={index}
            className="list-subcategories__item"
            data-testid="value"
          >
            <span className="list-subcategories__item_title">{el}</span>
            <span
              className="list-subcategories__item_close"
              onClick={() => onDeleteValue(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Subcategories;
