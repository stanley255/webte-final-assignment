
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

// 1. We check what field was updated last, whether it was date or textinput(name).
// Based on this info we lookup the other field, e.g.: if date was entered last, we
// suppose the user wants to find out the names day on that date and if name was entered
// last, we suppose the user wants to see when that name celebrates.

function namesDayLookup() {
    if (lastUpdated=="date-input"){
        let date = parseDateInput();
        let names = retrieveNameFromDate(date);
        printName(names,date);
    }
    else if(lastUpdated=="name-input"){
        let name = $("#name-input").val();
        let dates = retrieveDateFromName(name);
        printDate(name,dates);
    }
} 

function printName(names, date){
    if (names.length==0){
        console.log("Pre zadaný dátum nebolo v kalendári nájdene meno");
        return;
    }
    let output = "V deň "+formatDate(date)+" majú sviatok tieto mená: ";
    for (let i=0;i<names.length;++i){
        console.log(names[i].nationality);
        output+=" "+names[i].nationality+": ";
        output+=names[i].names.textContent+";";
    }
    console.log(output);
}

function printDate(name,dates){
    if (dates.length==0){
        console.log("Pre vstup "+name+" nebol nájdený záznam v kalendári");
        return;
    }
    let output = "Meno "+name.toString()+" má sviatok v tieto dni: ";
    for (let i=0;i<dates.length;++i){
        output+=dates[i].name.nodeName+": ";
        output+=(formatDate(dates[i].date));
        output+=" ("+dates[i].name.textContent+") ";
    }
    console.log(output);
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

function checkifNameEquals(input1,input2){
    input1 = normalizeName(input1);
    input2 = normalizeName(input2);
    
    // There might be multiple names on this date that have namesday
    // so we separate them to array and check each
    if (input2.includes(",")){
        let inputAr = input2.split(",");
        if (inputAr.includes(input1)){            
            return true;
        }
    }
    else{
        if(input1==input2){
            return true;
        }
    }
    return false;
}

function normalizeName(name){
    name = name.toLowerCase();
    name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    name = name.replace(" ","");
    return name;
}

// function parseDateInput(){
//     // Create and adjust day output
//     let day = $('#select-day').val()
//     if(day.length==1) 
//         day = '0' + day;
//     // Create and adjust month output
//     let month = $('#select-month').val();
//     if(month.length==1) 
//         month = '0' + month;
    
//     let output = month + day;
//     return output;
// }

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

$(function trimDateInput(){
    $("#date-input").keyup(function(event) {
        var value = $("#date-input").val();
        //check number of chars before dot, after dot ctrl+v and max month and day
        //if key is backspace, dont do any special action
        if(event.keyCode==8){
            return;
        }
        //if value is length two, one of which is number and one of which is dot
        //prepend 0
        else if(value.length==2 && value.includes('.')){
            $("#date-input").val('0'+value);
            console.log('case3');
        }
        //if key is dot and there is no dot yet, insert
        else if(event.key=='.' && (value.match(/\./g) || []).length==1){
            console.log('case0')
            return;
        }
        //if length of date is greater than 2 and it does not include dot or is greater than 5,
        //dont allow to insert anything more
        else if(value.length>2 && !value.includes('.') || value.length>5){
            $("#date-input").val(value.replace(event.key,''));
            console.log('case1');
        }
        //if length of input is 2 and first two values are digits, append dot
        else if (value.length==2 && !isNaN(parseInt(value[0])) && !isNaN(parseInt(value[1]))){
            $("#date-input").val(value+'.');
            console.log('case2');
        }
        //if there's 1 dot, don't allow to insert any more
        else if((value.match(/\./g) || []).length>1){
            $("#date-input").val(value.replace(event.key,''));
            console.log('case4');
        }
        //if you try to insert anything other than digit, don't allow
        else if(isNaN(parseInt(event.key))){
            $("#date-input").val(value.replace(event.key,''));
            console.log('case5');
        }
    });
});

function switchLastUpdated(){
    lastUpdated = this.id;
}

// If this function is called it means that toggle was switched, therefore we can assume
// that we should change the input type
function changeInputType() {
    $('.input-box').each(function() {
        $(this).toggle();
    })
    switchLastUpdated();
    let htmlText = $("#input-toggle").is(":checked") ? "Vyhľadaj meno" : "Vyhľadaj dátum";
    $("#search-button").html(htmlText);
}