import 'chart.js/auto';
import './PieChart.css';
import { Doughnut } from 'react-chartjs-2';

export default function PieChart() {
  return (
    <div className="pieChart">
      <Doughnut
        data={{
          labels: [
            '💡 Uncategorized',
            '🛒 Groceries',
            '🏡 Home',
            '🍽️ Eating Out',
            '🛍️ Clothing & Shoes',
            '🚞 Transport',
            '🎞️ Entertainment',
            '👶 Kids',
            '🧳 Travel',
            '💖 Healthcare',
            '🦋 Beauty',
            '🖥️ Hardware',
            '🚗 Car',
            '🐕 Pets',
            '🪙 Taxes',
            '🏫 Education',
            '🎁 Gift',
            '👍 Charity',
          ],
          // animation: [{ animateScale: true }],
          datasets: [
            {
              label: 'My Expense',
              data: [
                200, 220, 1000, 200, 500, 600, 50, 600, 80, 100, 300, 530, 590,
                340, 780, 180, 28, 985,
              ],

              backgroundColor: [
                'rgb(35, 34, 35)',
                'rgb(237, 209, 85)',
                'rgb(237, 118, 85)',
                'rgb(255, 99, 132)',
                'rgb(128, 85, 237)',
                'rgb(85, 237, 156)',
                'rgb(217, 237, 85)',
                'rgb(247, 235, 190)',
                'rgb(190, 213, 247)',
                'rgb(247, 190, 214)',
                'rgb(242, 56, 99)',
                'rgb(56, 81, 242)',
                'rgb(77, 81, 107)',
                'rgb(109, 122, 51)',
                'rgb(102, 23, 27)',
                'rgb(23, 85, 102)',
                'rgb(92, 247, 87)',
                'rgb(173, 126, 123)',
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
