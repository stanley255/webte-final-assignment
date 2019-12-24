var namesdayList;
var lastUpdated;

$(document).ready(function() {
  loadNamesday(namesdayList).done(function(data) {
    namesdayList = $(data).find("zaznam");
    injectTodaysName();
    // console.log(namesdayList[0].children[0]);
  });
  setupHandlers();
});

function setupHandlers() {}

function loadNamesday(data) {
  return $.ajax({
    url: "./resources/meniny.xml",
    type: "GET",
    data: data
  });
}

function injectTodaysName() {
  let names = retrieveNameFromDate(getToday());
  let output = names[0].names.textContent;
  output = output.split(",");
  $("#namesday-today").append("<em><b>" + output[0] + "</em></b>");
}

function retrieveNameFromDate(date) {
  let names = [];
  let name;

  $(namesdayList).each(function(index, value) {
    if (value.children[0].textContent == date) {
      $(value.children).each(function(index2, value2) {
        //SKd is the same as SK but extended, so we do not need sk
        if (value2.nodeName != "SK" && value2.nodeName != "den") {
          name = {
            nationality: value2.nodeName,
            names: value2
          };
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
  let month = d.getMonth() + 1;

  //Prepend zero if needed to match the date format of the attached XML
  if (day.toString().length == 1) {
    day = "0" + day.toString();
  }
  if (month.toString().length == 1) {
    month = "0" + month.toString();
  }
  return month.toString() + day.toString();
}

function formatDate(date) {
  let month = date[0].toString() + date[1].toString();
  let day = date[2].toString() + date[3].toString();
  return day + "." + month;
}

function normalize(input) {
  input = input.toLowerCase();
  input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  input = input.replace(" ", "");
  return input;
}

$("#namesday-input").on("keyup", function() {
  var value = $(this)
    .val()
    .toLowerCase();
  var result = [];
  jQuery.grep(
    namesdayList,
    function(n, i) {
      //Check whether user is inputting date and if so, create a json with all
      //namesday on that day. The for cycle starts at 1 because 0 is the date value.
      if (n.children[0].textContent == convertDateToBigEndian(value)) {
        for (var i = 1; i < n.children.length; ++i) {
          var toReturn = {
            name: n.children[i].textContent,
            country: n.children[i].tagName,
            date: n.children[0].textContent
          };
          result.push(toReturn);
        }
      }

      //The user is propapbly inputting a name at this point, so check whether
      //we have the expected name in our data and return it in json in the
      //same fashion as before.
      else {
        for (var i = 1; i < n.children.length; ++i) {
          //Since SK is just a subset of SKd, we do not need it
          if (n.children[i].tagName == "SK") {
            continue;
          }

          if (normalize(n.children[i].textContent).includes(normalize(value))) {
            var toReturn = {
              name: n.children[i].textContent,
              country: n.children[i].tagName,
              date: n.children[0].textContent
            };

            result.push(toReturn);
          }
        }
      }
    },
    false
  );
  $("#result").empty();
  printResults(result);
  if (!value) {
    $("#result").empty();
  }
});

function printResults(input) {
  input.forEach(element => {
    var toAppend =
      '<li class="collection-item">' +
      convertDateToLittleEndian(element.date) +
      "<span>: </span>" +
      element.name +
      " [" +
      element.country +
      "]<br></li>";
    $("#result").append(toAppend);
  });
}

function convertDateToLittleEndian(input) {
  return input[2] + input[3] + "." + input[0] + input[1];
}

function convertDateToBigEndian(value) {
  //Single digit day, single digit month (^\d\.\d\.?) "x.x."
  if (value.match(/(^\d\.\d\.?$)/)) {
    // console.log("0"+value[2]+"0"+value[0]);
    return "0" + value[2] + "0" + value[0];
  }

  //Single digit day, double digit month (^\d\.\d{2}\.?) "x.xx"
  else if (value.match(/(^\d\.\d{2}\.?$)/)) {
    // console.log(value[2]+value[3]+"0"+value[0]);
    return value[2] + value[3] + "0" + value[0];
  }

  //Double digit day, single digit month (^\d{2}\.\d\.?$) "xx.x"
  else if (value.match(/(^\d{2}\.\d\.?$)/)) {
    // console.log("0"+value[3]+value[0]+value[1]);
    return "0" + value[3] + value[0] + value[1];
  }

  //Ordinary double digit day, double digit month (^\d{2}\.\d{2}\.?$) "xx.xx"
  else if (value.match(/(^\d{2}\.\d{2}\.?$)/)) {
    // console.log(value[3]+value[4]+value[0]+value[1]);
    return value[3] + value[4] + value[0] + value[1];
  }

  //Retard-endian
  else if (!value.includes(".")) {
    return value;
  }
}

//TODO: Format tagnames
