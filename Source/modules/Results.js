// Results.js
import React from 'react'

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var foods = this.props.items.map(function(food, i) {
      return (
        <div key={i}>
          <p> {food.grams} grams of {food.name} </p>
          <p> Fat = {food.fat} grams </p>
          <p> Carbs = {food.carbs} grams </p>
          <p> Sugar = {food.sugar} grams </p>
        </div>
      );
    });

  return (
    <div id='lineContainer'>
      {foods}
    </div>
  );

  }
}
