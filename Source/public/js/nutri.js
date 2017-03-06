var request = require('request')

module.exports = {

  makePost: function(foodSearch, appKey, appId) {
    
    var getResult = function(body) {
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

          // When curItem is reset to {}, does this ruin everything?
          response.items.push(curItem);
        }
      }
      else {
        response.error = 'Nothing matched the search: ' + foodSearch;
      }

      console.log(response);
      return response;
    };


    var headers = {
      'x-app-key' : appKey,
      'x-app-id' : appId,
      'Content-Type':'application/json',
    };

    var body = {
      query : foodSearch
    // fields: ['item_name','brand_name','nf_calories','nf_sodium','item_type']
    };

    var options = {
      method: 'POST',
      uri: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
      headers: headers,
      body: body,
      json: true
    };

    var response = {};

    request(options, function(error, response, body) {
      if (error === null) {
        response = getResult(body);
      }
      else {
        console.log('error: ' + error);
        response.error = error;
      }
    });

    return response;
  }
}
