import React, { FC } from 'react';
import Chart from 'react-google-charts';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store/store';
import { prepareDataForStatistics } from '../../../utils/prepareDataForStatistics';
import './StatisticsTable.css';

const header = ['Category', 'Subcategory', 'Payment'];

const StatisticsTable: FC = () => {
  const costs = useSelector((store: IRootState) => store.costs);
  const categories = useSelector((store: IRootState) => store.categories);
  const range = useSelector((store: IRootState) => store.range);

  const tableData = [
    header,
    ...prepareDataForStatistics('table', costs, range, categories),
  ];

  return (
    <Chart
      chartType="Table"
      width="100%"
      data={tableData}
      options={{
        allowHtml: true,
        showRowNumber: true,
      }}
      render={({ renderControl, renderChart }) => (
        <div className="statistics__table-container">
          <div className="statistics__table-filters">
            <div className="statistics__table-filters_filter">
              {renderControl(
                ({ controlProp }) =>
                  controlProp.controlID === 'select-category',
              )}
            </div>
            <div className="statistics__table-filters_filter">
              {renderControl(
                ({ controlProp }) =>
                  controlProp.controlID === 'select-subcategory',
              )}
            </div>
          </div>
          <div className="statistics__table-chart">{renderChart()}</div>
        </div>
      )}
      controls={[
        {
          controlType: 'CategoryFilter',
          controlID: 'select-category',
          options: {
            filterColumnIndex: 0,
            ui: {
              labelStacking: 'vertical',
              label: 'Category:',
              allowTyping: false,
              allowMultiple: true,
            },
          },
        },
        {
          controlType: 'CategoryFilter',
          controlID: 'select-subcategory',
          options: {
            filterColumnIndex: 1,
            ui: {
              labelStacking: 'vertical',
              label: 'Subcategory:',
              allowTyping: false,
              allowMultiple: true,
            },
          },
        },
      ]}
    />
  );
};

export default StatisticsTable;
