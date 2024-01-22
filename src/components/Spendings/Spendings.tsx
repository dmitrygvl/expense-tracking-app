import React, { FC, FormEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { createSpending } from '../../API/spending/spending';
import { IRootState } from '../../store/store';
import { addZero } from '../../utils/convertFunc';
import { spendingStorage } from '../../API/firebase';
import { addSpending } from '../../store/slices/spendingSlice';
import { ISubcategory } from '../../API/category/category';
import './Spendings.css';

const Spendings: FC = () => {
  const now = new Date();
  const [selectedCategory, setSelectedCategory] = useState({
    value: '',
    label: '',
  });
  const [selectedSubcategory, setSelectedSubcategory] = useState({
    value: '',
    label: '',
  });
  const [date, setDate] = useState(
    `${now.getFullYear()}-${addZero(now.getMonth())}-${addZero(now.getDate())}`,
  );
  const [payment, setPayment] = useState('0');
  const [message, setMessage] = useState('');
  const categories = useSelector((store: IRootState) => store.categories);
  const user = useSelector((store: IRootState) => store.user);
  const dispatch = useDispatch();

  const categoriesForSelection = useMemo(
    () => categories.map((el) => ({ value: el.id, label: el.name })),
    [categories],
  );

  const subcategoriesForSelection = useMemo(
    () =>
      (
        categories.find((el) => el.id === selectedCategory.value)
          ?.subcategories || []
      ).map((element) => ({ value: element.id, label: element.name })),
    [categories, selectedCategory],
  );

  const clearForm = () => {
    setSelectedCategory({ value: '', label: '' });
    setSelectedSubcategory({ value: '', label: '' });
    setDate(
      `${now.getFullYear()}-${addZero(now.getMonth())}-${addZero(
        now.getDate(),
      )}`,
    );
    setPayment('0');
  };

  const onFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    if (!selectedCategory.value) {
      setMessage('Be sure to choose a category.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }

    const expense = createSpending(
      new Date(date).getTime(),
      selectedCategory.value,
      selectedSubcategory.value,
      Number(payment),
    );

    if (user.uid) {
      const expenseId = await spendingStorage.create(user.uid, expense);

      if (expenseId) {
        dispatch(addSpending(expense));
        clearForm();
        setMessage('Spendings added.');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    }
  };

  return (
    <div className="_container">
      <div className="spendings">
        <h2 className="spendings__title">Add spendings:</h2>
        <form
          className="spendings__form form-spendings"
          onSubmit={onFormSubmit}
          name="spendings-form"
        >
          <label className="spendings__form_label" htmlFor="category">
            Category:
          </label>
          <Select
            inputId="category"
            placeholder="Select"
            value={selectedCategory}
            onChange={(e) => {
              if (e) {
                setSelectedCategory(e);
              }
            }}
            options={categoriesForSelection}
            required
          />
          <label className="spendings__form_label" htmlFor="subcategory">
            Subcategory:
          </label>
          <Select
            inputId="subcategory"
            placeholder="Select"
            value={selectedSubcategory}
            onChange={(e) => {
              if (e) {
                setSelectedSubcategory(e);
              }
            }}
            options={subcategoriesForSelection}
          />
          <label className="spendings__form_label" htmlFor="eventDate">
            Date:
          </label>
          <input
            data-testid="date"
            className="spendings__form_input _input"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            name="date"
            id="date"
            min="2000-01-01"
            max="2099-12-31"
            required
          />
          <label className="spendings__form_label" htmlFor="payment">
            Payment:
          </label>
          <input
            className="spendings__form_input _input"
            type="number"
            onChange={(e) => setPayment(e.target.value)}
            value={payment}
            name="payment"
            id="payment"
            min="0"
            step="0.01"
            required
          />
          <p className="spendings__form_message">{message}</p>
          <div className="form-spendings__buttons">
            <button
              className="form-spendings__buttons_button _button"
              type="button"
              onClick={clearForm}
            >
              Clear form
            </button>
            <button
              className="form-spendings__buttons_button _button"
              type="submit"
            >
              Add cost
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Spendings;
