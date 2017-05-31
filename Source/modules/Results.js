// Results.js
import React from 'react'
import CarbInsulin from './CarbInsulin'
var BarChart = require('react-chartjs').Bar;
//var Chart = require('chart.js');

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.state = {user: props.user, insulin: 3};
  }

  componentWillMount() {
    // set state with insulin amount user specified
    var self = this;
    
  }

   componentWillReceiveProps(nextProps) {
      var self = this;
      this.setState({ user: nextProps.user });  

    $.ajax({
      url: 'http://localhost:8080/userInfo',
      type: 'POST',
      data: JSON.stringify({user: nextProps.user}),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(response){
        self.setState({insulin: response.userInfo.demographics.insulin});
      }
    }); 

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
 
    // None of this affects the chart... http://www.chartjs.org/docs/latest/configuration/tooltip.html 
    var chartOptions = {
      tooltips: {
        enabled: false
      },
      animation: {
        easing: 'easeOutElastic'
      }
    };

    var barChart = null;
    var carbInsulinAnimation = null;
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
      carbs += foodList[i].carbs;
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
    if (carbs == 0) {
      carbs = -1;
    }

    if (this.props.items.length > 0) {
      barChart = <BarChart data={chartData} options={chartOptions} redraw width="650" height="325" />
    }
    
    return (
      <div>
        {foods} 
        {barChart}
        <br/> <br/>
				<CarbInsulin insulin={this.state.insulin} carbs={carbs}/>
      </div>
    );

  }

}
