$(function () {
  var searchField = $(".search-bar");
  var ghost = $(".autocomplete-ghost");
  var suggestionList = [];
  var activeSuggestion = "";

  // Google suggestion fetch
  function fetchSuggestions(query) {
    if (!query) {
      ghost.text("");
      return;
    }
    $.ajax({
      url: "//clients1.google.com/complete/search",
      dataType: "jsonp",
      data: { q: query, nolabels: "t", client: "youtube", ds: "yt" },
      success: function (r) {
        suggestionList = r[1].map(item => item[0]);
        showGhost(query);
      }
    });
  }

  // Show faded suggestion
  function showGhost(query) {
    activeSuggestion = suggestionList.find(s =>
      s.toLowerCase().startsWith(query.toLowerCase())
    ) || "";
    if (activeSuggestion) {
      ghost.text(activeSuggestion);
    } else {
      ghost.text("");
    }
  }

  // On typing
  searchField.on("input", function () {
    var val = $(this).val();
    ghost.text("");
    fetchSuggestions(val);
  });

  // Right arrow or Tab = accept suggestion
  searchField.on("keydown", function (e) {
    if ((e.key === "ArrowRight" || e.key === "Tab") && activeSuggestion) {
      e.preventDefault();
      $(this).val(activeSuggestion);
      ghost.text("");
    }
  });

  // Click inside input = accept suggestion
  searchField.on("click", function () {
    if (activeSuggestion) {
      $(this).val(activeSuggestion);
      ghost.text("");
    }
  });
});
