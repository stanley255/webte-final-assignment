
var namesdayList;
var lastUpdated;

$(document).ready(function() {     
    loadNamesday(namesdayList).done(function(data) {
        namesdayList = $(data).find('zaznam');
        injectTodaysName();
        // console.log(namesdayList[0].children[0]);
    });
    setupHandlers();
});

function setupHandlers() {
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


function normalize(input){
    input = input.toLowerCase();
    input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    input = input.replace(" ","");
    return input;
}



$("#namesday-input").on("keyup",function(){
    var value = $(this).val().toLowerCase();
    var result = jQuery.grep(namesdayList,function(n,i){

        for(var i=0;i<n.children.length;++i){
            if(normalize(n.children[i].textContent).startsWith(normalize(value))){
                return (n)
            }
        }
    },false);

    $("#result").empty();
    printResults(result);
    if(!value){
        $("#result").empty();
    }
});

function printResults(input){
    input.forEach(element => {
        var arr = [].slice.call(element.children);
        var toAppend="<li class=\"collection-item\">"+arr[0].textContent+"<span> :<br></span>";
        for(var i=1;i<arr.length;++i){
            toAppend= toAppend.concat(arr[i].textContent+"<b> ["+arr[i].tagName+"]</b><br>");
        }
        toAppend=toAppend.concat("</li>");
        $("#result").append(toAppend);
    });
    
}


//TODO: Search all regions, not just slovak namesday
//TODO: Search dates
//TODO: Format dates in output
//TODO: Filter tagnames(dont display all)
//TODO: Format tagnames 