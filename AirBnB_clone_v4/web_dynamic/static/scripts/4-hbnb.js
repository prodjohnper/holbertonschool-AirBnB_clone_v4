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
  // Send a POST request to the places_search endpoint
  // Function to fetch places data and update the DOM
  function fetchPlaces(data) {
    // Send a POST request to the places_search endpoint
    $.post({
      url: "http://127.0.0.1:5001/api/v1/places_search/",
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (data) {
        $('section.places').empty();  // Clear the section before adding new places

        data.forEach(place => {
          // Create an article element for each place
          const article = $('<article></article>');

          // Create the title box with the name and price of the place
          const titleBox = $('<div class="title_box"></div>');
          const name = $('<h2></h2>').text(place.name);
          const price = $('<div class="price_by_night"></div>').text(`$${place.price_by_night}`);
          titleBox.append(name, price);

          // Create the information box with max_guest, number_rooms, and number_bathrooms
          const information = $('<div class="information"></div>');
          const maxGuest = $('<div class="max_guest"></div>').text(`${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`);
          const numRooms = $('<div class="number_rooms"></div>').text(`${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`);
          const numBathrooms = $('<div class="number_bathrooms"></div>').text(`${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`);
          information.append(maxGuest, numRooms, numBathrooms);

          // Create the description box with the description of the place
          const description = $('<div class="description"></div>').html(place.description);

          // Append the title box, information, and description to the article
          article.append(titleBox, information, description);
          $('section.places').append(article);
        });
      },
      error: function (error) {
        // Log error to console if there is an error fetching places
        console.error('Error fetching places:', error);
      }
    });
  }

  // Initial fetch of places without any filters
  fetchPlaces({});

  // Add click event handler for the button
  $('button').click(function () {
    // Fetch places with the selected amenities
    console.log('Fetching places with amenities:', checkedAmenities);
    fetchPlaces({ amenities: Object.keys(checkedAmenities) });
  });
});
