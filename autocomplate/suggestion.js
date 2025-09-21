$(function () {
  var searchField = $("#search-basic");
  var activeSuggestion = "";

  // Fetch suggestions from Google YouTube
  function fetchSuggestions(query) {
    if (!query) {
      searchField.attr("data-suggestion", "");
      return;
    }

    $.ajax({
      url: "//clients1.google.com/complete/search",
      dataType: "jsonp",
      data: { q: query, nolabels: "t", client: "youtube", ds: "yt" },
      success: function (r) {
        var list = r[1].map(item => item[0]);
        activeSuggestion = list.find(s =>
          s.toLowerCase().startsWith(query.toLowerCase())
        ) || "";
        updateGhost(query);
      }
    });
  }

  // Update ghost suggestion inside input
  function updateGhost(typed) {
    if (activeSuggestion && activeSuggestion.toLowerCase() !== typed.toLowerCase()) {
      searchField.attr("data-suggestion", activeSuggestion);
    } else {
      searchField.attr("data-suggestion", "");
    }
  }

  // On typing
  searchField.on("input", function () {
    fetchSuggestions($(this).val());
  });

  // Accept suggestion on Right Arrow / Tab
  searchField.on("keydown", function (e) {
    if ((e.key === "ArrowRight" || e.key === "Tab") && activeSuggestion) {
      e.preventDefault();
      $(this).val(activeSuggestion);
      $(this).attr("data-suggestion", "");
      activeSuggestion = "";
    }
  });
});
