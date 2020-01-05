// Page sidebar for mobile version
(function ($) {
    $(function () {
        $('.sidenav').sidenav();
    });
})(jQuery);

// Pop-initialization
$(document).ready(function () {
    $('.modal').modal();
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

// Initialiazation for feature pop-ups
$(document).ready(function () {
    $('.tap-target').tapTarget();
});
// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.tap-target');
//     var instances = M.TapTarget.init(elems, {color: "white"});
// });