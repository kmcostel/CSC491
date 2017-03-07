module.exports = {
   getResult: function(body) {
      var response = {};
      var curItem;

      if (body['foods']) {

        response.numItems = body['foods'].length;
        response.items = [];

        for (var i = 0; i < body['foods'].length; i++) {
          curItem = {};

          curItem.name      = body['foods'][i].food_name;
          curItem.calories  = body['foods'][i].nf_calories;
          curItem.grams     = body['foods'][i].serving_weight_grams;
          curItem.carbs     = body['foods'][i].nf_total_carbohydrate;
          curItem.protein   = body['foods'][i].nf_protein
          curItem.fat       = body['foods'][i].nf_total_fat;
          curItem.sugar     = body['foods'][i].nf_sugars;
          curItem.fiber     = body['foods'][i].nf_dietary_fiber;
          curItem.quantity  = body['foods'][i].quantity;

          response.items.push(curItem);
        }
      }
      else {
        response.error = 'Nothing matched the search';
      }

      return response;
    }
}
