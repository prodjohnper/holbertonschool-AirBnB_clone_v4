/**
 * * This script will listen for changes on each INPUT checkbox tag
*/

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
    // Update the h4 tag to display checked amenities
    if (Object.keys(checkedAmenities).length != 0) {
      // Join the values of the checkedAmenities obj
      let spanText = Object.values(checkedAmenities).join(", ");
      let newSpan = "<span>" + spanText + "</span>";
      $(".amenities h4").html(newSpan);
    } else {
      // If the obj is empty, display non-breaking space
      $(".amenities h4").html("&nbsp;");
    }

    // Style the h4 tag to display checked amenities properly
    $(".amenities h4 span").css({
      display: "block",
      "max-width": "205px",
      overflow: "hidden",
      "white-space": "nowrap",
      "text-overflow": "ellipsis",
    });
  });
});
