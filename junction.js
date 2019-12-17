let currentJunction;
let JUNCTION_CLASS_ACTIVE = "active";
let JUNCTION_CLASS_INACTIVE = "waves-effect";
let JUNCTION_IMAGES_PATH = "./img/junctions/";

function initializeJunctionPage() {
    bindJunctionChangeFunction();
    currentJunction = $(".active");
    changeSvgBackground(formJunctionPath("01"));
}

function bindJunctionChangeFunction() {
    $("#junction-select li").each(function(id, li) {
        $(li).click(function() {
            changeJunction(li);
        });
    });
}

function changeJunction(listItem) {
    // Change classes of current active junction to newly clicked
    toggleClassesToCurrentActive(listItem);
    // Set current junction to new one
    currentJunction = listItem;
    // Switch to new junction image
    setToCorrespongindJunctionImage(listItem);
    
}

function toggleClassesToCurrentActive(listItem) {
    changeElementClassToInactive(currentJunction);
    changeElementClassToActive(listItem);
}

function changeElementClassToActive(listItem) {
    $(listItem).removeClass(JUNCTION_CLASS_INACTIVE).addClass(JUNCTION_CLASS_ACTIVE);
}

function changeElementClassToInactive(listItem) {
    $(listItem).removeClass(JUNCTION_CLASS_ACTIVE).addClass(JUNCTION_CLASS_INACTIVE);
}

function setToCorrespongindJunctionImage(listItem) {
    let junctionNumber = getJunctionNumberFromListItem(listItem);
    let junctionPath = formJunctionPath(junctionNumber);
    changeSvgBackground(junctionPath);
}

function getJunctionNumberFromListItem(listItem) {
    let junctionNumber = listItem.innerText;
    return junctionNumber < 10 ? "0"+junctionNumber : junctionNumber;
}

function formJunctionPath(junctionNumber) {
    return "url(\""+JUNCTION_IMAGES_PATH+junctionNumber+".png\")";
}

function changeSvgBackground(path) {
    $("#svg").css("background-image", path);
}