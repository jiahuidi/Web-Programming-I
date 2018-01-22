const fs = require("fs");

let fileData = exports = module.exports;

fileData.getFileAsString = (fileName, callback) => {
    return new Promise((fulfill, reject) => {
        if (!fileName) throw "No file name provided";

        fs.readFile(fileName, "utf-8", (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            try {
                fulfill(data);
            } catch (parsingError) {
                reject(parsingError);
            }
        });
    });
};

fileData.getFileAsJSON = (fileName) => {
    return new Promise((fulfill, reject) => {
        if (!fileName) throw "No file name provided";

        fs.readFile(fileName, "utf-8", (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            try {
                let jsonData = JSON.parse(data);
                fulfill(jsonData);
            } catch (parsingError) {
                reject(parsingError);
            }
        });
    });
};

fileData.saveStringToFile = (fileName, data) => {
    //fs.writeFile(fileName, text, callback);
    return new Promise((fulfill, reject) => {
        if (!fileName) throw "No file name provided";

        fs.writeFile(fileName, data, (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            fulfill(data);
        });
    });
};

fileData.saveJSONToFile = (fileName, data) => {
    //fs.writeFile(fileName, JSON.stringify(obj, null, 4), callback);
    return new Promise((fulfill, reject) => {
        if (!fileName) throw "No file name provided";

        fs.writeFile(fileName, JSON.stringify(data, null, 4), (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            fulfill(data);
        });
    });
};