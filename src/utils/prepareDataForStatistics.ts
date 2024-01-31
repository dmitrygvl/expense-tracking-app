import { ICost } from '../API/cost/cost';
import { IRange } from '../store/slices/rangeSlice';
import { IConvertCategory } from './convertCategories';

interface IGroupingForTable {
  categoryId: string;
  subcategoryId: string;
  payment: number;
}

interface IGroupingForChart {
  categoryId: string;
  payment: number;
}

type IPreparedDataForTable = [string, string, number];
type IPreparedDataForChart = [string, number];

const filteredCostsForRange = (costs: ICost[], range: IRange) =>
  costs.filter((cost) => {
    const date = new Date(cost.date);
    return date >= new Date(range.startDate) && date <= new Date(range.endDate);
  });

export const prepareDataForStatistics = (
  typeStatistics: 'table' | 'chart',
  costs: ICost[],
  range: IRange,
  categories: IConvertCategory[],
) => {
  const filteredCosts = filteredCostsForRange(costs, range);

  if (typeStatistics === 'table') {
    const groupedCosts: IGroupingForTable[] = [];

    filteredCosts.forEach((cost) => {
      const groupedElement = groupedCosts.find(
        (item) =>
          item.categoryId === cost.categoryId &&
          item.subcategoryId === cost.subcategoryId,
      );

      if (groupedElement) {
        const index = groupedCosts.indexOf(groupedElement);
        groupedCosts[index].payment += cost.payment;
      } else {
        groupedCosts.push({
          categoryId: cost.categoryId,
          subcategoryId: cost.subcategoryId,
          payment: cost.payment,
        });
      }
    });

    return groupedCosts.map((cost) => {
      const row: IPreparedDataForTable = ['', '', 0];
      const category = categories.find((item) => item.id === cost.categoryId);

      if (category) {
        row[0] = category.name;

        const subCategory = category.subcategories.find(
          (item) => item.id === cost.subcategoryId,
        );

        if (subCategory) {
          row[1] = subCategory.name;
        }
      }

      row[2] = cost.payment;

      return row;
    });
  }

  const groupedCosts: IGroupingForChart[] = [];

  filteredCosts.forEach((cost) => {
    const groupedElement = groupedCosts.find(
      (item) => item.categoryId === cost.categoryId,
    );

    if (groupedElement) {
      const index = groupedCosts.indexOf(groupedElement);
      groupedCosts[index].payment += cost.payment;
    } else {
      groupedCosts.push({
        categoryId: cost.categoryId,
        payment: cost.payment,
      });
    }
  });

  return groupedCosts.map((cost) => {
    const row: IPreparedDataForChart = ['', 0];
    const category = categories.find((item) => item.id === cost.categoryId);

    if (category) {
      row[0] = category.name;
    }

    row[1] = cost.payment;

    return row;
  });
};
