(function ($) {
    $(function () {
        $('.sidenav').sidenav();
    }); // end of document ready
})(jQuery); // end of jQuery name space

// Disable all task-checkboxes click
$(".task-checkbox").each((i, checkbox) => {
    $(checkbox).on("click", function (e) {
        e.preventDefault();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
        constrainWidth: false
    });
});