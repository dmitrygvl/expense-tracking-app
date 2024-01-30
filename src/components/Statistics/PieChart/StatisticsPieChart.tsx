import React, { FC } from 'react';
import Chart from 'react-google-charts';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store/store';
import { prepareDataForStatistics } from '../../../utils/prepareDataForStatistics';
import './StatisticsPieChart.css';

const header = ['Category', 'Payment'];

const StatisticsPieChart: FC = () => {
  const costs = useSelector((store: IRootState) => store.costs);
  const categories = useSelector((store: IRootState) => store.categories);
  const range = useSelector((store: IRootState) => store.range);

  const pieChartData = [
    header,
    ...prepareDataForStatistics('chart', costs, range, categories),
  ];

  return (
    <Chart
      className="statistics__pie-chart"
      chartType="PieChart"
      data={pieChartData}
      options={{
        title: 'Costs by category',
      }}
    />
  );
};

export default StatisticsPieChart;
