import 'chart.js/auto';
import './PieChart.css';
import { Doughnut } from 'react-chartjs-2';

const colorMap = {
  '💡 Uncategorized': 'rgb(35, 34, 35)',
  '🛒 Groceries': 'rgb(237, 209, 85)',
  '🏡 Home': 'rgb(237, 118, 85)',
  '🍽️ Eating Out': 'rgb(255, 99, 132)',
  '🛍️ Clothing & Shoes': 'rgb(128, 85, 237)',
  '🚞 Transport': 'rgb(85, 237, 156)',
  '🎞️ Entertainment': 'rgb(217, 237, 85)',
  '👶 Kids': 'rgb(247, 235, 190)',
  '🧳 Travel': 'rgb(190, 213, 247)',
  '💖 Healthcare': 'rgb(247, 190, 214)',
  '🦋 Beauty': 'rgb(242, 56, 99)',
  '🖥️ Hardware': 'rgb(56, 81, 242)',
  '🚗 Car': 'rgb(77, 81, 107)',
  '🐕 Pets': 'rgb(109, 122, 51)',
  '🪙 Taxes': 'rgb(102, 23, 27)',
  '🏫 Education': 'rgb(23, 85, 102)',
  '🎁 Gift': 'rgb(92, 247, 87)',
  '👍 Charity': 'rgb(173, 126, 123)',
  '💵 Salary #1': 'rgb(38, 168, 131)',
  '💵 Salary #2': 'rgb(66, 109, 237)',
  '💰 Tax Return': 'rgb(232, 215, 39)',
  '📈 Stock income': 'rgb(190, 39, 232)',
  '🤑 Business profit': 'rgb(123, 181, 229)',
};

export default function PieChart({ transactionStats, selectedType }) {
  const categoryList = transactionStats.map((trans) => trans._id.category);
  const sumValueList = transactionStats.map((trans) => trans.sumValue);

  const colours = categoryList.map((categoryName) => colorMap[categoryName]);

  return (
    <div className="pieChart">
      <Doughnut
        data={{
          labels: categoryList,
          // animation: [{ animateScale: true }],
          datasets: [
            {
              label: `My ${selectedType}`,
              data: sumValueList,

              backgroundColor: colours,
              hoverOffset: 4,
            },
          ],
        }}
      />
    </div>
  );
}
