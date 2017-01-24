
function buttonEvent() {
  console.log("Button click");

  var queryStr = document.getElementById("myText").value;
  console.log(queryStr);

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/query",
    data: $("#text").value,
    dataType: "json", //expecting json returned from the server
    success: function(response) {
      console.log(response);
    },
    done: function(data) {
      console.log(data);
    }
  });
}
