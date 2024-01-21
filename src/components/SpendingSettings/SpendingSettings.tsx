import React, { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Subcategories from '../Subcategories/Subcategories';
import { createCategory } from '../../API/category/category';
import { categoryStorage } from '../../API/firebase';
import './SpendingSettings.css';
import { TRootState } from '../../store/store';
import { IUser } from '../../API/user/userModel';
import { addCategory } from '../../store/slices/categoriesSlice';

const SpendingSettings: FC<Record<string, any>> = () => {
  const [subcategories, setSubcategories] = useState([] as string[]);
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const user = useSelector((store: TRootState) => store.user);
  const dispatch = useDispatch();

  const onDeleteSubcategories = (index: number) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  const onAddSubcategories = (value: string) => {
    setSubcategories([...subcategories, value]);
  };

  const clearForm = () => {
    setCategoryName('');
    setSubcategories([]);
    setDescription('');
  };

  const onFormSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    const category = createCategory(categoryName, description, subcategories);

    const categoryId = await categoryStorage.create(
      (user as IUser).uid,
      category,
    );

    if (categoryId) {
      setMessage('Category added!');
      dispatch(addCategory({ categoryId: category }));
    } else {
      setMessage('Error of category creation in Firebase!');
    }

    setTimeout(() => setMessage(''), 3000);

    clearForm();
  };

  return (
    <div className="_container">
      <div className="category">
        <h2 className="category__title">Create category:</h2>
        <form
          className="category__form form-category"
          onSubmit={onFormSubmit}
          name="category-form"
        >
          <label className="category__form_label" htmlFor="category">
            Category:
          </label>
          <input
            className="category__form_input _input"
            type="text"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            name="category"
            id="category"
            minLength={3}
            required
          />
          <label className="category__form_label" htmlFor="subcategories">
            Subcategory:
          </label>
          <Subcategories
            name="subcategories"
            value={subcategories}
            placeholder="Press ENTER to add"
            onAddValue={onAddSubcategories}
            onDeleteValue={onDeleteSubcategories}
          />
          <label className="category__form_label" htmlFor="description">
            Description:
          </label>
          <textarea
            className="category__form_description _input"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name="description"
            id="description"
          />
          {message && <p className="category__form_message">{message}</p>}
          <div className="form-category__buttons">
            <button
              className="form-category__buttons_button _button"
              type="button"
              onClick={clearForm}
            >
              Clear form
            </button>
            <button
              className="form-category__buttons_button _button"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpendingSettings;
