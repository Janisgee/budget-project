import 'chart.js/auto';
import './PieChart.css';
import { Doughnut } from 'react-chartjs-2';

export default function PieChart() {
  return (
    <div className="pieChart">
      <Doughnut
        data={{
          labels: [
            'Eating Out',
            'Groceries',
            'Home',
            'Clothing & Shoes',
            'Transport',
            'Entertainment',
            'Car',
            'Travel',
            'kkkkkkkkkk',
          ],
          // animation: [{ animateScale: true }],
          datasets: [
            {
              label: 'My Expense',
              data: [200, 220, 1000, 200, 500, 600, 50, 600],

              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(125, 198, 153)',
                'rgb(110, 112, 194)',
                'rgb(176, 97, 255)',
                'rgb(243,255, 53)',
                'rgb(255, 205, 255)',
              ],
              hoverOffset: 4,
            },
          ],
        }}
      />
    </div>
  );
}

// [
//   { name: 'hello', value: 5 },
//   { name: 'goodbye', value: 15 },
//   { name: 'si', value: 55 },
// ];

// const colourMap = {
//   'Eating Out': 'rgb(255, 99, 132)',
// };
