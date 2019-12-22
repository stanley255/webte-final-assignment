let CARS = {};
let JUNCTION = {};
let currentJunctionItem;


let JUNCTION_CLASS_ACTIVE = "active teal";
let JUNCTION_CLASS_INACTIVE = "waves-effect";
let JUNCTION_IMAGES_PATH = "./img/junctions/";
let JUNCTION_IMAGE_EXTENSION = ".png";

let CAR_SVG_PATH = "./img/cars/";
let CAR_SVG_PREFIX = "cars-";
let CAR_SVG_EXTENSION = ".svg";

let JUNCTION_OBJECTS_PATH = "/resources/junctions/";
let JUNCTION_OBJECTS_EXTENSION = ".json";

let STARTING_JUNCTION_NUMBER = "01";
let CAR_COLORS = [
    "blue",
    "red",
    "green"
];

window.addEventListener("load", initializeJunctionPage(), false);

// Function that does initialization routine on page load
function initializeJunctionPage() {
    bindJunctionChangeFunction();
    currentJunctionItem = $(".active");
    changeSvgBackground(formJunctionSvgPath(STARTING_JUNCTION_NUMBER));
    loadJunction(STARTING_JUNCTION_NUMBER);
}

function bindJunctionChangeFunction() {
    $("#junction-select li").each(function(id, li) {
        $(li).click(function() {
            changeJunction(li);
        });
    });
}

function loadJunction(junctionNumber) {
    $.get(formJunctionObjectPath(junctionNumber), function(data) {
        JUNCTION = new Junction(data);
    }).done(function() {
        loadCars(JUNCTION.cars);
    });
}

function loadCars(carColors) {
    carColors.forEach(color => {
        console.log(color + " car loaded"); // TODO Remove - only for testing purposes
        loadCar(color);
    });
}

function loadAllCars() {
    CAR_COLORS.forEach(color => {
        loadCar(color);
    });
}

function loadCar(inputColor) {
    $.get(formCarSvgPath(inputColor), function(data) {
        let junctionSvg = document.getElementById("svg");
        junctionSvg.appendChild(createCarSvgElement(data));
    }).done(function() {
        CARS[inputColor] = new Car(inputColor);
    });
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
    currentJunctionItem = listItem;
    // Switch to new junction image
    setToCorrespongindJunctionImage(listItem);
    // TODO Implement deleting previous cars
    
    let junctionNumber = getJunctionNumberFromListItem(listItem);
    loadJunction(junctionNumber);
}

function toggleClassesToCurrentActive(listItem) {
    changeElementClassToInactive(currentJunctionItem);
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
    let junctionPath = formJunctionSvgPath(junctionNumber);
    changeSvgBackground(junctionPath);
}

function getJunctionNumberFromListItem(listItem) {
    let junctionNumber = listItem.innerText;
    return junctionNumber < 10 ? "0"+junctionNumber : junctionNumber;
}

function formJunctionSvgPath(junctionNumber) {
    return "url(\""+JUNCTION_IMAGES_PATH+junctionNumber+JUNCTION_IMAGE_EXTENSION+"\")";
}

function formJunctionObjectPath(junctionNumber) {
    return JUNCTION_OBJECTS_PATH + junctionNumber + JUNCTION_OBJECTS_EXTENSION;
}

function changeSvgBackground(path) {
    $("#svg").css("background-image", path);
}