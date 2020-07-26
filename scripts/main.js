const paramsProcessor = require("./subFunctions/paramsProcessor.js");
const getKML = require("./getKML.js");
const getStopLocations = require("./getStopLocations.js");

const params = paramsProcessor.parse(process.argv);
console.log(params);

if (params.getKML) {
    getKML.run();
}

if (params.getStopLocations) {
    getStopLocations.run();
}

if (params.getBusFeed) {
    // Not available
    console.log("Getting bus feed not available at the moment. Function not implemented.");
}