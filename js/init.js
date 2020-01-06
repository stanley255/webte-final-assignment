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
});

// Disable all task-checkboxes click
$(".task-checkbox").each((i, checkbox) => {
    $(checkbox).on("click", function (e) {
        e.preventDefault();
    });
});

// Namesday popup button
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
        constrainWidth: false
    });
});