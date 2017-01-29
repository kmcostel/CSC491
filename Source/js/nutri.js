
function buttonEvent() {
  console.log("Button click");

  var queryStr = document.getElementById("myText").value;
  console.log(queryStr);
  var data = {};
  data.query = queryStr;

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/query",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function(response) {
      console.log(response);
    }
  });
}
