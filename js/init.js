// Page sidebar for mobile version
(function ($) {
    $(function () {
        $('.sidenav').sidenav();
    });
})(jQuery);

$(document).ready(function () {
    $('.modal').modal();
    $('.collapsible').collapsible();
    $('.materialboxed').materialbox();
    $('.tap-target').tapTarget();
    // Show namesday results on ENTER
    $('#namesday-input').keyup(function(event) {
        if (event.which === 13) {
            event.preventDefault();
            if ($("#result").children().length > 0)
                document.querySelector("#namesday-result-button").click();
        }
    });
    // Show feature discovery on mouseOver
    $("#namesday-widget").mouseover(function() {
        if (!namesdayWidgetDiscovered) {
          $('.tap-target').tapTarget('open');
          namesdayWidgetDiscovered = true;
        }
      });
    // Disable all task-checkboxes click
    $(".task-checkbox").each((i, checkbox) => {
        $(checkbox).on("click", function (e) {
            e.preventDefault();
        });
    });
});

// Namesday popup button
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
        constrainWidth: false
    });
});