let currentJunction;

let JUNCTION_CLASS_ACTIVE = "active teal";
let JUNCTION_CLASS_INACTIVE = "waves-effect";
let JUNCTION_IMAGES_PATH = "./img/junctions/";
let JUNCTION_IMAGE_EXTENSION = ".png";

let CAR_SVG_PATH = "./img/cars/";
let CAR_SVG_PREFIX = "cars-";
let CAR_SVG_EXTENSION = ".svg";

let STARTING_JUNCTION_NUMBER = "01";
let CAR_COLORS = [
    "blue",
    "red",
    "green"
];

let cars = {};

window.addEventListener("load", initializeJunctionPage(), false);

// Function that does initialization routine on page load
function initializeJunctionPage() {
    bindJunctionChangeFunction();
    currentJunction = $(".active");
    changeSvgBackground(formJunctionPath(STARTING_JUNCTION_NUMBER));
    loadCarSvg("blue"); // TODO replace with loadSvgsOfCars()
    loadCarsObjects();
}

function bindJunctionChangeFunction() {
    $("#junction-select li").each(function(id, li) {
        $(li).click(function() {
            changeJunction(li);
        });
    });
}

function loadSvgsOfCars() {
    CAR_COLORS.forEach(color => {
        loadCarSvg(color);
    });
}

function loadCarSvg(inputColor) {
    $.get(formCarSvgPath(inputColor), function(data) {
        let junctionSvg = document.getElementById("svg");
        junctionSvg.appendChild(createCarSvgElement(data));
    }).done();
}

function loadCarsObjects() {
    cars.blue = new Car("blue");
    cars.red = new Car("red");
    cars.green = new Car("green");
}

function createCarSvgElement(data) {
    let loadedCarSvg = document.createElement("svg");
    loadedCarSvg.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
    return loadedCarSvg.firstChild;
}

function formCarSvgPath(color) {
    let carColor = color.toLowerCase();
    return CAR_SVG_PATH + CAR_SVG_PREFIX + carColor + CAR_SVG_EXTENSION;
}

// Function that triggers when junction is about to switch to next one
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
    return "url(\""+JUNCTION_IMAGES_PATH+junctionNumber+JUNCTION_IMAGE_EXTENSION+"\")";
}

function changeSvgBackground(path) {
    $("#svg").css("background-image", path);
}