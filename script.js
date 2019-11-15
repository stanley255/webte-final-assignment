/*
--DEFINITION OF GLOBAL VARIABLES--
*/

var namesdayList;

/*
--FUNCTIONS--
*/
$(document).ready(function(){
     
    loadNamesday(namesdayList).done(function(data) {
        namesdayList = $(data).find('zaznam');
    });
    
    /* Delay is set because reading from external XML file is an async GET request
    /  and thus the program appends todays name even before it's loaded
    /  Any solution more elegant to this is very much welcome.
    */

    setTimeout(function() {
        injectTodaysName();
      }, 50);

});

function loadNamesday(data) {
    return $.ajax({
        url:  './meniny.xml',
        type: 'GET',
        data: data
    });
}

function injectTodaysName(){
    $("#namesday-today").append(retrieveNameFromDate(getToday()));
}

function retrieveNameFromDate(date){
    var name;

    $(namesdayList).each(function(index,value){
        if(value.children[0].textContent==date){
            name = value.children[1];
            return false;
        }
    });

    return name;
}

function getToday(){
    var d = new Date();
    var day = d.getDate();

    //JS months start from zero, so to get the correct notation, add 1

    var month = d.getMonth()+1;

    //Prepend zero if needed to match the date format of the attached XML

    if (day.toString().length==1){
        day = '0'+day.toString();
    }
    if (month.toString().length==1){
        month = '0'+month.toString();
    }
    return (month.toString()+day.toString());
}

/* I can see this function working in r ways. 
1. We check what field was updated last, whether it was date or textinput(name).
Based on this info we lookup the other field, e.g.: if date was entered last, we
suppose the user wants to find out the names day on that date and if name was entered
last, we suppose the user wants to see when that name celebrates.

2. We implement a switch that switches from one lookup to another.

3. We implement only one input field and base on the context of input, we return
the correct value.


*/

function namesDayLookup(){} 