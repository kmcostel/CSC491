// Results.js
import React from 'react'
var BarChart = require('react-chartjs').Bar;
//var Chart = require('chart.js');

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    var foodList = [];
    var foods = this.props.items.map(function(food, i) {
      foodList.push(food);
      
      return (
        <div key={i}>
          <p> {food.grams} grams of {food.name} </p>
        </div>
      );
		});
 
    
    var chartOptions = {
      tooltips: {
        enabled: false
      },
      stacked: true
    };

    var barChart = null;
		var fats = 0;
    var protein = 0;
    var sugar = 0;
    var carbs = 0;
    var name = "";

    // can't stack bars, can't have a variable number of food items on the chart it seems like
    // once the chart is drawn, it can't change the number of bars it has. But it can resize them
    // Seems like stacked bars might work so continue checking into that
    // Need to be able to call the chart's update() method to redraw it with new data and options
    
    var chartData = {
      labels: ["Carbs", "Fats", "Protein", "Sugar"],
      datasets: [
        {
          label: "Recommended daily value",
          fillColor: "#000000",
          strokeColor: "#000000",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [300, 65, 50, 30]
        }
      ]
    };
    
    for (var i = 0; i < foodList.length; i++) {
      chartData.datasets.push({
          label: foodList[i].name,
          fillColor: '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6),
          strokeColor: "#3ae64b",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [foodList[i].carbs, foodList[i].fat, foodList[i].protein, foodList[i].sugar]
      });
    };

    if (this.props.items.length > 0) {
      barChart = <BarChart data={chartData} options={chartOptions} redraw width="650" height="325" />
    }
    
    return (
      <div>
        {foods} 
        {barChart}
      </div>
    );

  }

}
