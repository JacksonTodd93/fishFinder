var fish = [
  {"name": 'Bitterling',
"location": 'River',
"size": "smallest",
"value": 900,
"start time": 0,
"end time": 0,
"months": ['Nov', 'Dec', 'Jan', 'Mar']
},
{"name": 'Pale Chub',
"location": 'River',
"size": 'smallest',
"value": 160,
"start time": 9,
"end time": 16,
"months": ['Year-round']
},
{"name": 'Crucian Carp',
"location": 'River',
"size": 'small',
"value": 160,
"start time": 0,
"end time": 0,
"months": ['Year-round']
},
{"name": 'Dace',
"location": 'River',
"size": 'Medium',
"value": 240,
"start time": 16,
"end time": 9,
"months": ['Year-round']
},
{"name": 'Carp',
"location": 'pond',
"size": 'large',
"value": 300,
"start time": 0,
"end time": 0,
"months": ['Year-round']
},
{"name": 'Koi',
"location": 'pond',
"size": 'large',
"value": 4000,
"start time": 16,
"end time": 9,
"months": ['Year-round']
},
{"name": 'Goldfish',
"location": 'pond',
"size": 'smallest',
"value": 1300,
"start time": 0,
"end time": 0,
"months": ['Year-round']
},
{"name": 'Pop-eyed Goldfish',
"location": 'pond',
"size": 'smallest',
"value": 1300,
"start time": 9,
"end time": 16,
"months": ['Year-round']
},
{"name": 'Ranchu Goldfish',
"location": 'pond',
"size": 'small',
"value": 4500,
"start time": 9,
"end time": 16,
"months": ['Year-round']
},
{"name": 'Killifish',
"location": 'pond',
"size": 'smallest',
"value": 300,
"start time": 0,
"end time": 0,
"months": ['Apr', 'May', 'Jun', 'Jul', 'Aug']
},
{"name": 'Crawfish',
"location": 'pond',
"size": 'small',
"value": 200,
"start time": 0,
"end time": 0,
"months": ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
},
{"name": 'Soft-shelled Turtle',
"location": 'river',
"size": 'large',
"value": 3750,
"start time": 16,
"end time": 9,
"months": ['Aug', 'Sep']
},
{"name": 'Snapping Turtle',
"location": 'river',
"size": 'extra large',
"value": 5000,
"start time": 21,
"end time": 4,
"months": ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
}}

// {"name": '',
// "location": '',
// "size": '',
// "value": ,
// "start time": ,
// "end time": ,
// "months": ['']
// }

fishFinder = function(fish){
  var valuable = {
    'name': null,
    'value': 0,
    'location': null,
    'size': null
  };
  var rightNow = new Date().toString();
  var currentMonth = rightNow.slice(4,7);
  var currentHour = parseInt(rightNow.slice(16, 18));

    for (var i = 0; i < fish.length; i++){
      var entry = fish[i];
      var startTime = fish[i]['start time'];
      var endTime = fish[i]['end time'];
      var months = fish[i]['months'];
      if (entry['value'] > valuable['value']){
        if (startTime > endTime){
          if (currentHour > startTime && currentHour < 24 || currentHour > 0 && currentHour < endTime){
            if (months.includes(currentMonth) || months === 'Year-round'){
              valuable['name'] = entry['name'];
              valuable['value'] = entry['value'];
              valuable['location'] = entry['location'];
              valuable['size'] = entry['size'];
            }
          }
          } else {
          if (currentHour > startTime && currentHour < endTime){
            if (months.includes(currentMonth) || months === 'Year-round'){
              valuable['name'] = entry['name'];
              valuable['value'] = entry['value'];
              valuable['location'] = entry['location'];
              valuable['size'] = entry['size'];
            }
          }
        }
      }
    }
    return 'The most valuable fish currently available is ' + valuable['name'] + ' with a value of ' + valuable['value'] + ' bells. It is located in the ' + valuable['location'] + ' and its shadow size is ' + valuable['size']
}