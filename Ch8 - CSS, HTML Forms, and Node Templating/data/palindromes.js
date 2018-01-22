let exportedMethods = {
    isPalindrome(phrase) {
        if (phrase === undefined) throw "Must provide a string";

        return phrase === phrase.split('').reverse().join('');
    }
}

module.exports = exportedMethods;