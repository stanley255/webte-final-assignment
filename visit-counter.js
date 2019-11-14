function showCounter() {
    let visitCounter = getCookie("counter");
    if (visitCounter === "") {
        visitCounter = 0;
    }
    visitCounter++;
    writeCountToPage("visit-counter", visitCounter);
    setCookie("counter", visitCounter, 10);
}

function writeCountToPage(outputElement, count) {
    document.getElementById(outputElement).innerHTML = count;
}

function setCookie(name, value, expirationDays) {
    let expirationDate = getExpirationDate(expirationDays);
    let expires = formCookieExpiration(expirationDate);
    saveCookie(name, value, expires);
}

function getExpirationDate(expirationDays) {
    let expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    return expirationDate;
}

function formCookieExpiration(expirationDate) {
    return "expires=" + expirationDate.toUTCString();
}

function saveCookie(name, value, expirationDate) {
    document.cookie = formCookieEntry(name, value, expirationDate);
}

function formCookieEntry(name, value, expires) {
    return name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let searchedName = name + "=";
    let splittedCookies = getDecodedCookies().splitCookies();
    for (currentCookie of splittedCookies) {
        while (currentCookie.charAt(0) == ' ') {
            currentCookie = currentCookie.substring(1);
        }
        if (currentCookie.indexOf(searchedName) == 0) {
            return currentCookie.substring(searchedName.length, currentCookie.length);
        }
    }
    return "";
}

function getDecodedCookies() {
    this.value = decodeURIComponent(document.cookie);
    return this;
}

function splitCookies() {
    return this.value.split(";");
}