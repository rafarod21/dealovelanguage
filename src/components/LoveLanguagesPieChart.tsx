// src/components/LoveLanguagesPieChart.tsx
'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

type ChartDataItem = {
  name: string;
  value: number;
  color: string;
};

interface LoveLanguagesPieChartProps {
  data: ChartDataItem[];
}

const LoveLanguagesPieChart: React.FC<LoveLanguagesPieChartProps> = ({
  data,
}) => {
  return (
    <div className='flex flex-col items-center h-96'>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={120}
            dataKey='value'
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                tabIndex={-1} /* evita foco */
                className='focus:outline-none' /* remove outline se focado */
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) =>
              `${value} resposta${value > 1 ? 's' : ''}`
            }
          />
        </PieChart>
      </ResponsiveContainer>

      <ul className='flex flex-wrap justify-start mt-2 gap-4'>
        {data.map((entry, index) => (
          <li key={`legend-${index}`} className='flex items-center space-x-2'>
            <span
              className='w-4 h-4 rounded'
              style={{ backgroundColor: entry.color }}
            />
            <span className='text-gray-100 text-sm'>{entry.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoveLanguagesPieChart;
