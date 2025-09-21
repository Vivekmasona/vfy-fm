$(document).ready(function () {
  var searchField = $("input.search-bar");
  var autocompleteResults = $("#autocomplete-results");
  var typingTimer;

  searchField.on("input", function () {
    var term = $(this).val();
    if (term.length < 1) {
      autocompleteResults.empty();
      return;
    }

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
      }
    });
  });

  autocompleteResults.on("click", ".autocomplete-suggestion", function () {
    var suggestion = $(this).text();
    searchField.val(suggestion);
    autocompleteResults.empty();
    $("#search-btn").click();
  });
});
