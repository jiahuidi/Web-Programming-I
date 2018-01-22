const getFileData = require("./fileData");
const getTextMetrics = require("./textMetrics");
const fs = require("fs");

function runLab3(fileName) {
    if (fs.existsSync(fileName + ".result.json")) {
        let jsonFileResult = getFileData.getFileAsJSON(fileName + ".result.json");

        jsonFileResult.then((data) => {
            console.log(`successfully to get \"${fileName}.result.json\"`);
            console.log(data);
        }).catch((error) => {
            console.log(`There was an error parsing the file \"${fileName}.result.json\"`);
            console.error(error);
        });
    } else {
        let textFileResult = getFileData.getFileAsString(fileName + ".txt");

        textFileResult.then((originalData) => {
            console.log(`successfully to get \"${fileName}.txt\"`);
            var simplifiedData = getTextMetrics.simplify(originalData);

            getFileData.saveStringToFile(fileName + ".debug.txt", simplifiedData).then(() => {
                console.log(`Done writing simplified data to \"${fileName}.debug.txt\"`);
            }).catch((error) => {
                console.log(error);
            });

            var obj = getTextMetrics.createMetrics(simplifiedData);
            return obj;
        }).catch((error) => {
            console.log(`There was an error parsing the file \"${fileName}.debug.txt\"`);
            console.error(error);
            return {};
        }).then((textMetrics) => {
            return getFileData.saveJSONToFile(fileName + ".result.json", textMetrics);
        }).then(() => {
            console.log(`Done writing \"${fileName}.result.json\"`);
        }).catch((error) => {
            console.log(error);
        });
    }
}

runLab3("chapter1");
runLab3("chapter2");
runLab3("chapter3");
