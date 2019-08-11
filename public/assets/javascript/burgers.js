// Make sure we wait to attach our handlers until the DOM is fully loaded
 

$(document).on("ready", function () {
  

  function getBurgers(res) {
    $.get("/api/burgers", function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
     // res.render(hbsObject);
    });
  }

getBurgers();

  $(document).on("click", "#change-devoured", function (event) {
    var id = $(this).data("id");
    var newdevoured = $(this).data("newdevoured");

    var newDevouredState = {
      devoured: newdevoured
    };
    console.log("NDS= " + newDevouredState);

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {
        console.log("changed devoured to", newdevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#add-burger").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("hello");

    var newBurger = {
      name: $("#ca").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});