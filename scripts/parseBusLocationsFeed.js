var https = require('https');
var fs = require('fs');
const func = require('./func');

// The stop location is embedded directly in the response html file.

// We get the html response file
var stopString;
fs.readFile("../misc/private/route.html", (err, data) => {
    if (err) { 
        console.log(err.message); 
    } else {
        stopString = "".concat(data.toString('utf-8'));
    }
});

// We extract the stop array from the html file
var matchVar = /var bstp.*;/m.exec(stopString).toString('utf-8');
matchVar = matchVar.replace(/var bstp .*= /, "").replace(/;$/, "");

// Convert stop array into json 
stopList = JSON.parse(matchVar);

// Output json to a file

// busResponse = JSON.parse(/{.*}/.exec(busResponse));
// var body = body.toString().replace(/\\/g, "");
// busResponse = JSON.parse(/{.*}/.exec(busResponse));