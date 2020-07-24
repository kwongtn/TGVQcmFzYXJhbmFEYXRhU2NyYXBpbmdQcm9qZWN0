"use strict";
var fs = require("fs");

// /* Reads depot list fron file and returns JSON
//  * Variables: 
//  ** removeSpace - To remove spaces ot not
//  ** key - key to remove spaces from
// */
// module.exports.getDepotList = (removeSpaces, key) => {
//     var tempJSON = JSON.parse(fs.readFileSync("../output/depot-Name.json"));
//     if (removeSpaces){
//         for (var i = 0; i < depotList.length; i++) {
//             depotList[i].depotName = depotList[i].key.replace(/\s/g, "");
//         }
//     } else {
// 
//     }
// };

/* Reads depot list fron file and returns JSON without removing spaces
 * Variable is to decide whether to remove all spaces
*/
module.exports.getDepotList = () => {
    try {
        return JSON.parse(fs.readFileSync("../output/depot-Name.json"));
    } catch (err) {
        console.log(err.message);
    }
};

module.exports.getKeyValuePair = (depotID) => {
    try {
        return JSON.parse(fs.readFileSync("../output/Key-Value_Pair/".concat(depotID, ".json")));
    } catch (err) {
        console.log(err.message);
    }
};

module.exports.replaceSpaces = (sourceStr, replaceStr) => {
    return sourceStr.replace(/\s/g, replaceStr);
};

module.exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};