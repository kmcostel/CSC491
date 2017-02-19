var request = require('request')

module.exports = {

  makePost: function(foodSearch, appKey, appId) {
    
    var printBody = function(body) {
      var str = '';
      if (body['foods']) {
        str += body['foods'].length + ' food items retrieved.'

        for (var i = 0; i < body['foods'].length; i++) {
          str += '\n' + body['foods'][i].food_name;

          str += '\ncalories: ' + body['foods'][i].nf_calories;

          str += '\nserving weight (grams): ' + body['foods'][i].serving_weight_grams;

          str += '\ntotal carbs: ' + body['foods'][i].nf_total_carbohydrate;

          str +='\ntotal protein: ' + body['foods'][i].nf_protein

          str += '\ntotal fat: ' + body['foods'][i].nf_total_fat;
          
          str += '\n';
        }
      }
      else {
        str = 'Nothing matched the search: ' + foodSearch;
      }

      console.log(str);
      return str;
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

    var str = '';

    request(options, function(error, response, body) {
      if (error === null) {
        str = printBody(body);
      }
      else {
        console.log('error: ' + error);
        str = 'error: ' + error;
      }
    });

    return str;
  }
}
