module.exports = {

  generate: function(foodSearch, appKey, appId) {
    
    var headers = {
      'x-app-key' : appKey,
      'x-app-id' : appId,
      'Content-Type':'application/json',
    };

    var body = {
      query : foodSearch
    };

    var options = {
      method: 'POST',
      uri: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
      headers: headers,
      body: body,
      json: true
    };

    return options;
  }
}
