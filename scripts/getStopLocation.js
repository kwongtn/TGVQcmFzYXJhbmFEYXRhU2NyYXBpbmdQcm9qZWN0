var https = require('https');
var fs = require('fs');
const func = require('./functions');

// Copy and paste the 'ci_session' cookie here.
const cookie = "mu6cnar8jn7cgrnpc2jvhou6bjk40q8r";

const depotList = func.getDepotList();
// Removes all spaces in depotList
for (var i = 0; i < depotList.length; i++) {
    depotList[i].depotName = func.replaceSpaces(depotList[i].depotName, "");
}

var pauseCount = 20;

// Async function to prevent stuff from going into the wrong folder. (Untested)
async function download(depotID, depotName, item) {

    var option = {
        'method': 'GET',
        'hostname': 'prs.prasarana.com.my',
        'path': '/route/routes?s1='.concat(depotID + '&s2=' + item.key),
        'headers': {
            'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
            'Cookie': 'ci_session='.concat(cookie),
            'Accept': '/',
            'Connection': 'keep-alive'
        },
        'maxRedirects': 20
    };
    console.log("Request for", option.path);

    var req = https.request(option, (res) => {
        var chunks = [];

        res.on("data", (chunk) => {
            chunks.push(chunk);
        });

        res.on("end", (chunk) => {
            console.log("Request for", option.path);
            var body = Buffer.concat(chunks);

            // Create directory if it doesn't exist
            if (!fs.existsSync("../output/StopList/".concat(depotID, "-", depotName))) {
                fs.mkdirSync("../output/StopList/".concat(depotID, "-", depotName));
            }

            // Process the response into a JSON file
            body = /var bstp.*;/m.exec(body).toString('utf-8');
            body = body.replace(/var bstp .*= /, "").replace(/;$/, "");
            // console.log(body);
            body = JSON.stringify(JSON.parse(body), null, 4);

            // Output the JSON file.
            fs.writeFile("../output/StopList/".concat(depotID, "-", depotName, "/").concat(item.val).concat(".json"), body, (err) => {
                if (err) { console.log(err.message); }
            }, () => {
                console.log("Output for route " + item.val);
            });

        });

        res.on("error", (err) => {
            console.error(err.message);
        });

    });
    await req.end();
}

// Looping
depotList.forEach(async (item, index, array) => {
    const depotID = item.depotID;
    const depotName = item.depotName;
    const active = item.active;

    const routeList = await func.getKeyValuePair(depotID);

    if (routeList.length === 0 || !active) {
        console.log("Depot", depotID, "is an empty set or inactive depot, skipping...");
    } else {
        routeList.forEach(async (item, index, array) => {
            console.log(pauseCount--);
            // Pause for 10 seconds before continuing.
            if (pauseCount <= 0) {
                await setTimeout(() => {
                    await download(depotID, depotName, item);
                }, 10000);
                pauseCount = 20;
            } else {
                pauseCount--;
                await download(depotID, depotName, item);
            }

        });
    }
});
