$(document).ready(function () {
  var searchField = $("input.search-bar");
  var autocompleteResults = $("#autocomplete-results");
  var typingTimer;
  var hideTimer;

  searchField.on("input", function () {
    var term = $(this).val();

    // Clear previous timers
    clearTimeout(typingTimer);
    clearTimeout(hideTimer);

    if (term.length < 1) {
      autocompleteResults.empty();
      return;
    }

    // Fetch autocomplete suggestions
    typingTimer = setTimeout(function() {
      $.ajax({
        url: "//clients1.google.com/complete/search",
        dataType: "jsonp",
        data: {
          q: term,
          nolabels: "t",
          client: "youtube",
          ds: "yt"
        },
        success: function (r) {
          var data = r[1].map(function (item) {
            return item[0];
          });

          autocompleteResults.empty();
          $.each(data, function (index, value) {
            autocompleteResults.append("<p class='autocomplete-suggestion'>" + value + "</p>");
          });

          // Hide suggestions 2 seconds after typing stops
          hideTimer = setTimeout(function() {
            autocompleteResults.empty();
          }, 2000);
        }
      });
    }, 0); // fetch immediately
  });

  autocompleteResults.on("click", ".autocomplete-suggestion", function () {
    var suggestion = $(this).text();
    searchField.val(suggestion);
    autocompleteResults.empty();
    $("#search-btn").click();
  });
});
