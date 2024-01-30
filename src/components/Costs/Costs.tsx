import React, { FC, FormEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { createCost } from '../../API/cost/cost';
import { IRootState } from '../../store/store';
import { addZero } from '../../utils/helpers';
import { costStorage } from '../../API/firebase';
import { addCost } from '../../store/slices/costsSlice';
import { ISubcategory } from '../../API/category/category';
import './Costs.css';

const Costs: FC = () => {
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
    `${now.getFullYear()}-${addZero(now.getMonth() + 1)}-${addZero(
      now.getDate(),
    )}`,
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
      ).map((element: ISubcategory) => ({
        value: element.id,
        label: element.name,
      })),
    [categories, selectedCategory],
  );

  const clearForm = () => {
    setSelectedCategory({ value: '', label: '' });
    setSelectedSubcategory({ value: '', label: '' });
    setDate(
      `${now.getFullYear()}-${addZero(now.getMonth() + 1)}-${addZero(
        now.getDate(),
      )}`,
    );
    setPayment('0');
  };

  const onFormSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    if (!selectedCategory.value) {
      setMessage('Be sure to choose a category ⚠️');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }

    const cost = createCost(
      new Date(date).getTime(),
      selectedCategory.value,
      selectedSubcategory.value,
      Number(payment),
    );

    if (user.uid) {
      const costId = await costStorage.create(user.uid, cost);

      if (costId) {
        dispatch(addCost(cost));
        clearForm();
        setMessage('Cost added 👍');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    }
  };

  return (
    <div className="_container">
      <div className="costs">
        <h2 className="costs__title">Add costs:</h2>
        <form
          className="costs__form form-costs"
          onSubmit={onFormSubmit}
          name="costs-form"
        >
          <label className="costs__form_label" htmlFor="category">
            Category:
          </label>
          <Select
            inputId="category"
            placeholder="Select"
            value={selectedCategory}
            onChange={(ev) => {
              if (ev) {
                setSelectedCategory(ev);
              }
            }}
            options={categoriesForSelection}
          />
          <label className="costs__form_label" htmlFor="subcategory">
            Subcategory:
          </label>
          <Select
            inputId="subcategory"
            placeholder="Select"
            value={selectedSubcategory}
            onChange={(ev) => {
              if (ev) {
                setSelectedSubcategory(ev);
              }
            }}
            options={subcategoriesForSelection}
          />
          <label className="costs__form_label" htmlFor="eventDate">
            Date:
          </label>
          <input
            data-testid="date"
            className="costs__form_input _input"
            type="date"
            onChange={(ev) => setDate(ev.target.value)}
            value={date}
            name="date"
            id="date"
            min="2000-01-01"
            max="2099-12-31"
            required
          />
          <label className="costs__form_label" htmlFor="payment">
            payment:
          </label>
          <input
            className="costs__form_input _input"
            type="number"
            onChange={(ev) => setPayment(ev.target.value)}
            value={payment}
            name="payment"
            id="payment"
            min="0"
            step="1"
            required
            data-testid="payment"
          />
          <p className="costs__form_message">{message}</p>
          <div className="form-costs__buttons">
            <button
              className="form-costs__buttons_button _button"
              type="button"
              onClick={clearForm}
            >
              Clear form
            </button>
            <button
              className="form-costs__buttons_button _button"
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

export default Costs;
