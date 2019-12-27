let CARS = {};
let JUNCTION = {};
let currentJunctionItem;

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

function loadCars(cars) {
    cars.forEach(car => {
        loadCar(car);
    });
}

function loadCar(car) {
    $.get(formCarSvgPath(car.color), function(data) {
        let junctionSvg = document.getElementById("svg");
        junctionSvg.appendChild(createCarSvgElement(data));
    }).done(function() {
        CARS[car.color] = new Car(car);
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
    // Disable junction demo&solution button
    disableDemoButton();
    disableSolutionButton();
    // Switch to new junction image
    setToCorrespongindJunctionImage(listItem);
    // Deleting previous cars
    clearCarsFromJunction();
    // Load new junction
    let junctionNumber = getJunctionNumberFromListItem(listItem);
    loadJunction(junctionNumber);
}

function toggleClassesToCurrentActive(listItem) {
    changeElementClassToInactive(currentJunctionItem);
    changeElementClassToActive(listItem);
}

function changeElementClassToActive(listItem) {
    removeAndAddClassToElement(listItem, JUNCTION_CLASS_INACTIVE, JUNCTION_CLASS_ACTIVE);
}

function changeElementClassToInactive(listItem) {
    removeAndAddClassToElement(listItem, JUNCTION_CLASS_ACTIVE, JUNCTION_CLASS_INACTIVE);
}

function enableDemoButton() {
    removeAndAddClassToElement(DEMO_BUTTON_ID, DEMO_BUTTON_INACTIVE, DEMO_BUTTON_ACTIVE);
}

function disableDemoButton() {
    removeAndAddClassToElement(DEMO_BUTTON_ID, DEMO_BUTTON_ACTIVE, DEMO_BUTTON_INACTIVE);
}

function enableSolutionButton() {
    removeAndAddClassToElement(SOLUTION_BUTTON_ID, SOLUTION_BUTTON_INACTIVE, SOLUTION_BUTTON_ACTIVE);
}

function disableSolutionButton() {
    removeAndAddClassToElement(SOLUTION_BUTTON_ID, SOLUTION_BUTTON_ACTIVE, SOLUTION_BUTTON_INACTIVE);
}

function removeAndAddClassToElement(element, removeClass, addClass) {
    $(element).removeClass(removeClass).addClass(addClass);
}

function setToCorrespongindJunctionImage(listItem) {
    let junctionNumber = getJunctionNumberFromListItem(listItem);
    let junctionPath = formJunctionSvgPath(junctionNumber);
    changeSvgBackground(junctionPath);
}

function clearCarsFromJunction() {
    CARS = {};
    $("#svg").empty();
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

function showCorrectAnswerPopUp() {
    showPopUpById(CORRECT_ANSWER_POP_UP_ID);
}

function showIncorrectAnswerPopUp() {
    showPopUpById(INCORRECT_ANSWER_POP_UP_ID);
}

function showPopUpById(elementId) {
    M.Modal.getInstance($(elementId)).open();
}