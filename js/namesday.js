
var namesdayList;
var lastUpdated;

$(document).ready(function() {     
    loadNamesday(namesdayList).done(function(data) {
        namesdayList = $(data).find('zaznam');
        injectTodaysName();
        setSelectorValueList();
        $('select').formSelect();
    });
    setupHandlers();
});

function setupHandlers() {
    $('#search-date-button').on('click', namesDayLookup);
    $('#name-input').on('change', switchLastUpdated);
    $('#date-input').on('change', switchLastUpdated);
    $('#input-toggle').on('change', changeInputType);    
    $('#select-month').on('change', adjustDayCount);
}

function loadNamesday(data) {
    return $.ajax({
        url:  './resources/meniny.xml',
        type: 'GET',
        data: data
    });
}

function injectTodaysName() {
    $("#namesday-today").append(retrieveNameFromDate(getToday()));
}

function retrieveNameFromDate(date){
    var names=[];
    var name;

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
        var names = retrieveNameFromDate(date);
        printName(names,date);
    }
    else if(lastUpdated=="name-input"){
        var name = $("#name-input").val();
        var dates = retrieveDateFromName(name);
        printDate(name,dates);
    }
} 

function printName(names, date){
    if (names.length==0){
        console.log("Pre zadaný dátum nebolo v kalendári nájdene meno");
        return;
    }
    var output = "V deň "+formatDate(date)+" majú sviatok tieto mená: ";
    for (var i=0;i<names.length;++i){
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
    var output = "Meno "+name.toString()+" má sviatok v tieto dni: ";
    for (var i=0;i<dates.length;++i){
        output+=dates[i].name.nodeName+": ";
        output+=(formatDate(dates[i].date));
        output+=" ("+dates[i].name.textContent+") ";
    }
    console.log(output);
}

function formatDate(date){
    var month = date[0].toString()+date[1].toString();
    var day = date[2].toString()+date[3].toString();
    return (day+"."+month);
}

function retrieveDateFromName(input){
    var dates=[];
    var date;
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
        var inputAr = input2.split(",");
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

function parseDateInput(){
    // Create and adjust day output
    let day = $('#select-day').val()
    if(day.length==1) 
        day = '0' + day;
    // Create and adjust month output
    let month = $('#select-month').val();
    if(month.length==1) 
        month = '0' + month;
    
    let output = month + day;
    return output;
}

function switchLastUpdated(){
    if($('#input-toggle').prop('checked')) {
        lastUpdated = 'date-input';
        resetText();
    } else {
        lastUpdated = 'name-input';
        resetDate();
    }
}

function resetText() {
    $('#name-input').val('');
    $('#name-input').removeClass('valid');
    $("label[for='name-input']").removeClass('active');
}

function resetDate() {
    $('#select-day').val(1);
    $('#select-day').formSelect();
    $('#select-month').val(1);
    $('#select-month').formSelect();
 }

// If this function is called it means that toggle was switched, therefore we can assume
// that we should change the input type
function changeInputType() {
    $('.input-box').each(function() {
        $(this).toggle();
    })
    switchLastUpdated();
    if($("#input-toggle").is(":checked")){
        $("#search-button").html("Vyhľadaj meno");
    }
    else{
        $("#search-button").html("Vyhľadaj dátum");
    }
}

const monthsEnum = {
    "január":01, 
    "február":02, 
    "marec":03, 
    "apríl":04, 
    "máj":05, 
    "jún":06, 
    "júl":07, 
    "august":08, 
    "september":09, 
    "október":10, 
    "november":11, 
    "december":12
};

function adjustDayCount() {
    // Get selected month as a value
    let month = $('#select-month').find(":selected").val();
    // Empty day list and fill it with appropriate number of days in the selected month
    $('#select-day').empty();
    let dayNum = getNumberOfDaysOfMonth(month);
    for (let i = 1; i <= dayNum; i++) {
        $('#select-day').append(new Option(i.toString() + '.', i.toString()));
    }
    // Update element <- SCREW YOU MATERIALIZE for this!!
    $('#select-day').formSelect();
}

function setSelectorValueList() {
    $.each(monthsEnum, function(index, val) {
        $('#select-month').append(new Option(index, val));
    });
    adjustDayCount();
}

function getNumberOfDaysOfMonth(month) {
    let count = 0;
    $(namesdayList).each(function(index, value){
        let monthValue = value.children[0].textContent.toString().substr(0,2);
        if(+month == +monthValue) {
            count++;
        }
    });
    return count;
}