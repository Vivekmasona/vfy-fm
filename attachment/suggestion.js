


$(document).ready(function () {
  var searchField = $("input.search-bar");
  var autocompleteResults = $("#autocomplete-results");
  var typingTimer;

  searchField.autocomplete({
    source: function (request, response) {
      var term = request.term;
      var s = {
        client: "youtube",
        ds: "yt"
      };

      $.ajax({
        url: "//clients1.google.com/complete/search",
        dataType: "jsonp",
        data: {
          q: term,
          nolabels: "t",
          client: s.client,
          ds: s.ds
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
    }
  });

  autocompleteResults.on("click", ".autocomplete-suggestion", function () {
    var suggestion = $(this).text();
    searchField.val(suggestion);
    hideAutocompleteResults();
    $("#search-btn").click();
  });

  searchField.keypress(function (event) {
    if (event.which === 8) {
      searchField.autocomplete("disable");
    }
  });

  searchField.on("input", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function () {
      hideAutocompleteResults();
    }, 5000);
  });

  function hideAutocompleteResults() {
    autocompleteResults.empty();
  }
});
  
