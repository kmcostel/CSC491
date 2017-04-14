// Results.js
import React from 'react'
var BarChart = require("react-chartjs").Bar;

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var foodList = [];
    var foods = this.props.items.map(function(food, i) {
      var thisFood = [];
      thisFood.push(food.carbs);
      thisFood.push(food.fat);
      thisFood.push(food.sugar);
      foodList.push(thisFood);

      return (
        <div key={i}>
          <p> {food.grams} grams of {food.name} </p>
          <p> Fat = {food.fat} grams </p>
          <p> Carbs = {food.carbs} grams </p>
          <p> Sugar = {food.sugar} grams </p>
        </div>
      );
    });

    var chartData =  {
            labels: ["Carbs", "Fats", "Sugar"],
            datasets: [
                {
                    label: "Recommended daily value",
                    fillColor: "#000000",
                    strokeColor: "#000000",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [200, 80, 35]
                },
                {
                    label: "This search's values",
                    fillColor: "#bfbfbf",
                    strokeColor: "#3ae64b",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: foodList[0]
                }
            ]
          };


    var chartOptions = {};
    let barChart = null;
    if (this.props.items.length > 0) {
      barChart = <BarChart data={chartData} options={chartOptions} width="380" height="275" />
    }

    return (
      <div>
        {foods} 
        {barChart}
      </div>
    );
  }
}
