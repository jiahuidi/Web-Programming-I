function createMetrics(text) {
    text = text.toLowerCase().replace(/\s\s+/g, ' ').replace(/[^0-9a-z ]/g, '');
    console.log(text);
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
    for (word in textMetricsObj.wordOccurrences) {
        if (textMetricsObj.wordOccurrences[word] == 1)
            textMetricsObj.uniqueWords++;
    }
    console.log(textMetricsObj);
    //return textMetricsObj;
}

createMetrics("Hello, my friends! This is a great day to say hello.\n\n\tHello! 2 3 4 23");