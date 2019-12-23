
var namesdayList;
var lastUpdated;

$(document).ready(function() {     
    loadNamesday(namesdayList).done(function(data) {
        namesdayList = $(data).find('zaznam');
        injectTodaysName();
    });
    setupHandlers();
});

function setupHandlers() {
    $('#search-date-button').on('click', namesDayLookup);
    $('#name-input').on('change', switchLastUpdated);
    $('#date-input').on('change', switchLastUpdated);
    $('#input-toggle').on('change', changeInputType);    
}

function loadNamesday(data) {
    return $.ajax({
        url:  './resources/meniny.xml',
        type: 'GET',
        data: data
    });
}

function injectTodaysName() {
    let names = retrieveNameFromDate(getToday());
    let output = names[0].names.textContent;
    output = output.split(',');
    $("#namesday-today").append('<em><b>' + output[0] + '</em></b>');
}

function retrieveNameFromDate(date){
    let names=[];
    let name;

    $(namesdayList).each(function(index,value){
        if(value.children[0].textContent==date){
            $(value.children).each( function(index2,value2){
                //SKd is the same as SK but extended, so we do not need sk
                if (value2.nodeName!="SK" && value2.nodeName!="den"){
                    name = 
                    {
                        "nationality":value2.nodeName,
                        "names":value2
                    }
                    names.push(name);
                }
            });
            return false;
        }
    });
    return names;
}

function getToday() {
    let d = new Date();
    let day = d.getDate();

    //JS months start from zero, so to get the correct notation, add 1
    let month = d.getMonth()+1;

    //Prepend zero if needed to match the date format of the attached XML
    if (day.toString().length==1){
        day = '0'+day.toString();
    }
    if (month.toString().length==1){
        month = '0'+month.toString();
    }
    return (month.toString()+day.toString());
}


function formatDate(date){
    let month = date[0].toString()+date[1].toString();
    let day = date[2].toString()+date[3].toString();
    return (day+"."+month);
}

function retrieveDateFromName(input){
    let dates=[];
    let date;
    $(namesdayList).each(function(index,value){
        $(value.children).each(function(index2,value2){
            if (checkifNameEquals(input,value2.textContent)) {
                //SKd is the same as SK but extended, so we do not need SK
                if(value2.nodeName!="SK"){
                    date=
                    {
                        "date":value.children[0].textContent,
                        "name":value2
                    };
                    dates.push(date);
                }
            }
        });
    });
    return dates;
}


function normalize(input){
    input = input.toLowerCase();
    input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    input = input.replace(" ","");
    return input;
}


function parseDateInput(){
    //thanks to trimDateInput function, the date will always be in format dd.dd or dd.d, so we
    //can suppose that number before dot is day of month and number after dot is month of year
    let value = $("#date-input").val();
    let output;
    //has two digits after dot
    if (value.length==5){
        output = [value[3]+value[4]+value[0]+value[1]].join('');
    }

    //has one digit after dot
    else if(value.length==4){
        output = ['0'+value[3]+value[0]+value[1]].join('');
    }
    
    return output;
}

$("#namesday-input").on("keyup",function(){
    var value = $(this.val()).toLowerCase();
    
});

