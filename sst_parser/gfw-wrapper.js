var request = require('request');
var fs = require('fs');

var parseGeoJSON = function(geojson, name) {
  console.log(geojson.features.length);
  var arrParse = [];
  for (var i = 0; i < geojson.features.length; i++) {
    arrParse.push({
      latitude: geojson.features[i].geometry.coordinates[1], 
      longitude: geojson.features[i].geometry.coordinates[0], 
      radius: 1, // Perform some sort of regression here.
      fillKey: 'tempbubble',
      borderWidth: 0,
      popupOnHover: true
    });
  }

  fs.writeFile(__dirname + '/parsed-geojson/' + name + ".json", JSON.stringify(arrParse, null, 2), function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("DONE");
      }
  }); 
};

var getFormaData = function(url, name) {
   var options = { method: 'GET',
    url: url};

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    parseGeoJSON(JSON.parse(body), name);
  }); 
};

var getFormaQuery = function(date, location) {
  // 2015-01-01,2015-01-29 sample date

  var options = { method: 'POST',
    url: 'http://api.globalforestwatch.org/forest-change/forma-alerts/admin/' + location,
    formData: { period: date } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    body = JSON.parse(body);
    getFormaData(body.download_urls.geojson, location + date);
  });
};


var getQueriesAllCountry = function(countryCode) {
  getFormaQuery('2015-01-01,2015-01-31', countryCode);
  getFormaQuery('2015-02-01,2015-02-28', countryCode);
  getFormaQuery('2015-03-01,2015-03-31', countryCode);
  getFormaQuery('2015-04-01,2015-04-30', countryCode);
  getFormaQuery('2015-05-01,2015-05-31', countryCode);
  getFormaQuery('2015-06-01,2015-06-30', countryCode);
};

getQueriesAllCountry("mmr");
getQueriesAllCountry("ind");
getQueriesAllCountry("bgd");
getQueriesAllCountry("tha");




