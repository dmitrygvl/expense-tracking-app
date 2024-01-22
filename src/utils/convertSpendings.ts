import { ISpending } from '../API/spending/spending';

export const convertSpendingsForStore = (
  spendings: Record<string, ISpending>,
) => {
  const result: ISpending[] = [];

  if (spendings) {
    Object.keys(spendings).forEach((item) => {
      result.push(spendings[item]);
    });
  }

  return result;
};
