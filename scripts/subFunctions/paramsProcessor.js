const fs = require('fs');

const notLast = [
    "--getKML", "--getStopLocations", "--getBusFeed", "--license"
]

/**
 * Parses the array and returns JSON object containing parameter details.
 * @param {array} params - An array of passed system parameters
 */
function paramsProcess(params) {
    var keys = {
        "path": params[params.length - 1],
        "getKML": false,
        "getStopLocations": false,
        "getBusFeed": false
    };

    params.forEach((value, index) => {
        switch (value) {
            case "--help": {
                helpText();
                break;
            }

            case "--license": {
                console.log(fs.readFileSync("./LICENSE.md", "utf-8"));
                process.exit();
                break;
            }

            case "--getKML": {
                keys.getKML = true;
                break;
            }

            case "--getStopLocations":{
                keys.getStopLocations = true;
                break;
            }

            case "--getBusFeed":{
                keys.getBusFeed = true;
                break;
            }

            default:
                break;
        }
    });
    return keys;
}

/**
 * Outputs the help text containing all parameters, then exit.
 */
function helpText() {
    console.log(
        "\nUsage: node ./main.js [params]\n\n",
        "\t--help\t\t\tDisplays this help message.\n",
        "\t--license\t\tOutputs the license of this project. (GNU General Public License)\n",
        "\t--getKML\t\tToggles to get the KML File.\n",
        "\t--getStopLocations\t\t[Cookie Required] Toggles to get the Stop Locations. \n",
        "\t--getBusFeed\t\t[Not available]Toggles to get the bus feed.\n",
        "\n",
        "\rProudly presented and licensed under the GNU General Public License v2.0 .\n",
        "\rPRs welcome at https://github.com/kwongtn/TGVQcmFzYXJhbmFEYXRhU2NyYXBpbmdQcm9qZWN0 \n\n",
        "\rIf there are any issues, please open an issue at https://github.com/kwongtn/TGVQcmFzYXJhbmFEYXRhU2NyYXBpbmdQcm9qZWN0/issues .",
        "\n\n"
    );
    process.exit();
}

/**
if (process.argv.length < 3) {
    helpText();
    process.exit();
} else {
    notLast.forEach((value, index) => {
        if (process.argv[process.argv.length - 1] == value) {
            helpText();
            process.exit();
        }

    });

    console.log(paramsProcess(process.argv));
}
*/

/**
 * @param {array} params
 */
module.exports.parse = (params) => {
    if (params.length < 3) {
        helpText();

    } else {
        /**
         * Code block in case we need something that verifies if the last parameter matches the "notLast" list.
         */
        /*
        notLast.forEach((value, index) => {
            if (params[params.length - 1] == value) {
                helpText();
            }

        });*/
        return paramsProcess(params);
    }

}