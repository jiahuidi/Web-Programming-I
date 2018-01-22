let textMetrics = exports = module.exports;

textMetrics.simplify = (text) => {
    text = text.toLowerCase().replace(/[^0-9a-z]/g, ' ').replace(/ +/g, ' ');
    return text;
};

textMetrics.createMetrics  = (text) => {
    var letters = text.replace(/ /g, '');
    var words = text.split(' ');
    if (words[words.length - 1] == '')
        words.pop();
    var word;
    var len = 0;
    var textMetricsObj = {
        totalLetters: letters.length,
        totalWords: words.length,
        uniqueWords: 0,
        longWords:0,
        averageWordLength: 0,
        wordOccurrences: {}
    };

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 6)
            textMetricsObj.longWords++;
        len = len + words[i].length;
        word = words[i];
        textMetricsObj.wordOccurrences[word] = textMetricsObj.wordOccurrences[word] || 0;
        textMetricsObj.wordOccurrences[word]++;
    }

    textMetricsObj.averageWordLength = len / words.length;
    for (let uniqueWord in textMetricsObj.wordOccurrences) {
        if (textMetricsObj.wordOccurrences[uniqueWord] == 1)
            textMetricsObj.uniqueWords++;
    }

    return textMetricsObj;
};