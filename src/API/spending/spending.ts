type TSpending = {
  id: string;
  date: number;
  category: string;
  subCategory: string;
  payment: number;
};

class Spending {
  id: string;

  date: number;

  category: string;

  subCategory: string;

  payment: number;

  constructor(options: TSpending) {
    const { id, date, category, subCategory, payment } = options;
    this.id = id;
    this.date = date;
    this.category = category;
    this.subCategory = subCategory;
    this.payment = payment;
  }
}

export default Spending;
