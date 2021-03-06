var https = require('https');
var fs = require('fs');
const func = require('./functions');

module.exports.run = () => {
    var depotList = func.getDepotList();

    // Removes all spaces in depotList
    for (var i = 0; i < depotList.length; i++) {
        depotList[i].depotName = func.replaceSpaces(depotList[i].depotName, "");
    }

    depotList.forEach((item, index, array) => {
        var exist = true;
        const depotID = item.depotID;
        const depotName = item.depotName;
        const active = item.active;

        if (active) {
            try {
                var routes = func.getKeyValuePair(depotID);
            } catch (error) {
                console.log(error.message);
                exist = false;
            }

            if (exist) {
                // Replaces all spaces with "%20"
                for (var i = 0; i < routes.length; i++) {
                    routes[i].val = func.replaceSpaces(routes[i].val, "%20");
                }
                console.log("Accessed", index + 1, "-", depotName);

                routes.forEach((item) => {
                    var option = {
                        'method': 'GET',
                        'hostname': 'prs.prasarana.com.my',
                        'path': '/assets/map/'.concat(item.val).concat('.kml?dummy=' + (new Date()).getTime()),
                        'headers': {
                            'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                            // 'Cookie': "ci_session=umfn65r7seletanh9n5k1rdgn0pshjno",
                            'Accept': '/',
                            'Connection': 'keep-alive'
                        },
                        'maxRedirects': 20
                    };

                    var req = https.request(option, function (res) {
                        var chunks = [];

                        res.on("data", function (chunk) {
                            chunks.push(chunk);
                        });

                        res.on("end", function (chunk) {
                            console.log("Request for", option.path);
                            var body = Buffer.concat(chunks);

                            // Create directory if it doesn't exist
                            if (!fs.existsSync("../output/KMLs/".concat(depotID, "-", depotName))) {
                                fs.mkdirSync("../output/KMLs/".concat(depotID, "-", depotName));
                            }

                            // Output the KML file.
                            fs.appendFile("../output/KMLs/".concat(depotID, "-", depotName, "/").concat(item.val).concat(".kml"), body, (err) => {
                                if (err) { console.log(err.message); }
                            })

                        });

                        res.on("error", function (error) {
                            console.error(error);
                        });
                    });

                    req.end();
                });
            };
        } else {
            console.log(depotID, "-", depotName, "is not an active depot, skipping...");
        }

    });
};