let JUNCTION = {};
let JUNCTION_OBJECTS = {};
let currentJunctionItem;
let deferreds = [];

const CLASSES = { Car, Pedestrian, Cyclist, Tram };

window.addEventListener("load", initializeJunctionPage(), false);

// Function that does initialization routine on page load
function initializeJunctionPage() {
    bindJunctionChangeFunction();
    currentJunctionItem = $("#junction-select li")[0];
    changeSvgBackground(formJunctionSvgPath(STARTING_JUNCTION_NUMBER));
    loadJunction(STARTING_JUNCTION_NUMBER, loadCallback);
    bindControlButtonFunction();
}

function bindJunctionChangeFunction() {
    $("#junction-select li").each(function(id, li) {
        $(li).on('click', () => changeJunction(li));
    });
}

function unbindJunctionChangeFunction() {
    $("#junction-select li").each(function(id, li) {
        $(li).off('click');
    });
}

function bindControlButtonFunction() {
    $("#junction-demo-button").click(() => {
        unbindJunctionChangeFunction();   
        clearObjectsFromJunction();
        let junctionNumber = getJunctionNumberFromListItem(currentJunctionItem);
        loadJunction(junctionNumber, reloadCallback);
    });
}

function loadJunction(junctionNumber, callback) {
    $.get(formJunctionObjectPath(junctionNumber), function(data) {
        JUNCTION = new Junction(data);
    }).done(callback);
}

function loadCallback() {
    loadObjects(JUNCTION.objects, loadObject);
}

function reloadCallback() {
    deferreds = [];
    loadObjects(JUNCTION.objects);
    $.when.apply(null, deferreds).done(function() {
        runDemoActions();
    });
}

// TODO: - refactor runDemoActions() & runActionsRecursively()
//       - disable ul for junction change or stop demo after junction change
function runDemoActions() {
    runActionsRecursively(0);
}

function runActionsRecursively(objectIndex) {
    JUNCTION.turnOffOnClickListenerForJunctionObjects();
    unbindJunctionChangeFunction();
    if (JUNCTION.hasSimultaneousPassage() && JUNCTION.isObjectPartOfSimultaneousPassage(getObjectFromSolution(objectIndex)))
        simultaneousPassageActionExecution(objectIndex);
    else
        basicActionExecution(objectIndex);
}

function basicActionExecution(objectIndex) {
    JUNCTION.executeActions(getObjectFromSolution(objectIndex)).then(() => {
        afterDemoActionExecutionRoutine(objectIndex, 1);
    });
}

function simultaneousPassageActionExecution(objectIndex) {
    let firstObjectPromise = JUNCTION.executeActions(getObjectFromSolution(objectIndex));
    let secondObjectPromise = JUNCTION.executeActions(getObjectFromSolution(objectIndex + 1));

    $.when( firstObjectPromise, secondObjectPromise ).done(function() {
        afterDemoActionExecutionRoutine(objectIndex, 2);
    });
}

function afterDemoActionExecutionRoutine(objectIndex, increment) {
    JUNCTION.turnOnOnClickListenerForJunctionObjects();
    bindJunctionChangeFunction();
    if (JUNCTION.solutions[0][objectIndex + increment])
        runActionsRecursively(objectIndex + increment);
}

function getObjectFromSolution(objectIndex) {
    return JUNCTION_OBJECTS[JUNCTION.solutions[0][objectIndex]];
}

function loadObjects(objects) {
    $(objects).each((i, object) => {
        loadObject(object);
    });
}

function loadObject(object) {
    deferreds.push($.get(formSvgPath(object), function(data) {
        let junctionSvg = document.getElementById("svg");
        junctionSvg.appendChild(createSvgElement(data));
    }).done(function() {
        JUNCTION_OBJECTS[object.id] = new CLASSES[object.type](object);
    }));
}

function createSvgElement(data) {
    let loadedObjectSvg = document.createElement("svg");
    loadedObjectSvg.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
    return loadedObjectSvg.firstChild;
}

function formSvgPath(object) {
    return object.type.toLowerCase() === "car" ? formCarSvgPath(object) : formOthersSvgPath(object);
}

function formCarSvgPath(object) {
    let carColor = object.color.toLowerCase();
    return CAR_SVG_PATH + CAR_SVG_PREFIX + carColor + CAR_SVG_EXTENSION;
}

function formOthersSvgPath(object) {
    return OTHERS_SVG_PATH + object.type.toLowerCase() + OTHERS_SVG_EXTENSION;
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
    // Deleting previous objects
    clearObjectsFromJunction();
    // Load new junction
    let junctionNumber = getJunctionNumberFromListItem(listItem);
    // Empty promise array for object loading
    deferreds = [];
    loadJunction(junctionNumber, loadCallback);
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

function clearObjectsFromJunction() {
    JUNCTION_OBJECTS = {};
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

function showCrashAnswerPopUp() {
    showPopUpById(CRASH_ANSWER_POP_UP_ID);
}

function showPopUpById(elementId) {
    M.Modal.getInstance($(elementId)).open();
}