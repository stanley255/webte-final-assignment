
var namesdayList;
var lastUpdated;

$(document).ready(function() {     
    loadNamesday(namesdayList).done(function(data) {
        namesdayList = $(data).find('zaznam');
        injectTodaysName();
    });
});

function loadNamesday(data) {
    return $.ajax({
        url:  './meniny.xml',
        type: 'GET',
        data: data
    });
}

function injectTodaysName() {
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

function getToday() {
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

// 1. We check what field was updated last, whether it was date or textinput(name).
// Based on this info we lookup the other field, e.g.: if date was entered last, we
// suppose the user wants to find out the names day on that date and if name was entered
// last, we suppose the user wants to see when that name celebrates.

function namesDayLookup() {
    if (lastUpdated=="date-input"){
        var date = parseDateInput();
        var name = retrieveNameFromDate(date);
        console.log(name);
    }
    else if(lastUpdated=="name-input"){
        
    }
} 

function parseDateInput(){
    var value = $("#date-input").val();
    value = value.split('.').join('');
    
    return value;
}



$(function trimDateInput(){
    $("#date-input").keyup(function(event) {
    var value = $("#date-input").val();

      if(value.length>1 && !(value.includes('.'))){
          $("#date-input").val([value[0],value[1],'.',value[3],value[4]].join(''));
      }
      if ( event.keyCode<48 || event.keyCode>57 ){
        $("#date-input").val(value.replace(event.key,''));
      }
      if(value.length>4){
        $("#date-input").val([value[0],value[1],'.',value[3],value[4]].join(''));
      }
    });
});


function switchLastUpdated(element){
    lastUpdated = element.id;
}