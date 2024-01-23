import { ICost } from '../API/cost/cost';

export const convertCostsForStore = (costs: Record<string, ICost>) => {
  const result: ICost[] = [];

  if (costs) {
    Object.keys(costs).forEach((item) => {
      result.push(costs[item]);
    });
  }

  return result;
};
