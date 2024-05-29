$(document).ready(function () {
  // Obj to store checked amenities
  let checkedAmenities = {};
  $(".amenities li input").change(function () {
    // Get the name and ID of the amenity
    let amenityName = $(this).attr("data-name");
    let amenityID = $(this).attr("data-id");

    if ($(this).is(":checked")) {
      // Add the amenity to checkedAmenities obj
      checkedAmenities[amenityID] = amenityName;
    } else {
      // Remove the amenity from checkedAmenities obj
      delete checkedAmenities[amenityID];
    }

    if (Object.keys(checkedAmenities).length != 0) {
      // Join the values of the checkedAmenities obj
      let spanText = Object.values(checkedAmenities).join(", ");
      let newSpan = "<span>" + spanText + "</span>";
      $(".amenities h4").html(newSpan);
    } else {
      // If the obj is empty, display non-breaking space
      $(".amenities h4").html("&nbsp;");
    }

    $(".amenities h4 span").css({
      // Style the h4 tag to display checked amenities properly
      display: "block",
      "max-width": "205px",
      overflow: "hidden",
      "white-space": "nowrap",
      "text-overflow": "ellipsis",
    });
  });

  $.get("http://127.0.0.1:5001/api/v1/status/", function (data) {
    // Get the status of the API
    console.log(data.status);
    if (data.status === "OK") {
      // If the status is OK, add the class available
      $("#api_status").addClass("available");
    }
    else {
      // If the status is not OK, remove the class available
      $("#api_status").removeClass("available");
    }
  });
});
