function UserException(message) {
    this.message = message;
    this.name = "UserException";
}

function sumOfSquares(x, y, z) {
    //var re = /^[0-9]+.?[0-9]*$/;   //isNum   //isPositiveInteger /^[1-9]+[0-9]*]*$/
    //if (!re.test(x))
    if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        return x * x + y * y + z * z;
    } else {
        throw new UserException("Function sumOfSquares: InvalidInput -- NotNumber");
    }
}

function sayHelloTo(firstName, lastName, title) {
    if (firstName !== undefined) {
        if (lastName !== undefined) {
            if (title !== undefined) {
                console.log(`Hello, ${title} ${firstName} ${lastName}! Have a good evening!`);
            } else {
                console.log(`Hello, ${firstName} ${lastName}! I hope you are having a good day!`)
            }
        } else {
            console.log(`Hello, ${firstName}!`);
        }
    } else {
        throw new UserException("Function sayHelloTo: ErrorInput -- NoFirstName");
    }
}

function cupsOfCoffee(howManyCups) {
    if (!isNaN(howManyCups)) {
       if (howManyCups > 0){
            for (var i = howManyCups; i > 2; i--) {
                console.log(`${i} cups of coffee on the desk! ${i} cups of coffee!`);
                console.log(`Pick one up, drink the cup, ${i - 1} cups of coffee on the desk!`);
            }
            if (i == 2) {
                console.log("2 cups of coffee on the desk! 2 cups of coffee!");
                console.log("Pick one up, drink the cup, 1 cup of coffee on the desk!");
                i--;
            }
            if (i == 1) {
                console.log("1 cup of coffee on the desk! 1 cup of coffee!");
                console.log("Pick it up, drink the cup, no more coffee left on the desk!");
            }
        } else {
            throw new UserException("Function cupsOfCoffee: ErrorInput -- howManyCups <= 0");
        }
    } else {
        throw new UserException("Function cupsOfCoffee: InvalidInput -- NotNumber");
    }
}

function occurrencesOfSubstring(fullString, subString) {
    if (fullString !== undefined && subString !== undefined && fullString.length >= subString.length){
        var index = 0, index1 = 0, count = 0;
        for (let i = 0; i < fullString.length && (index1 != -1); i++) {
            index1 = fullString.indexOf(subString, index);
            index = index1 + 1;
            count = i;
        }
        return count;
    } else {
        throw new UserException("Function occurrencesOfSubstring: InvalidInput");
    }
}

function randomizeSentences(paragraph) {
    if (paragraph !== undefined && (paragraph.indexOf(".") > 0 || paragraph.indexOf("!") > 0)) {
        let array = [];
        let array1 = paragraph.split("!");

        for (let i = 0; i < array1.length; i++){
            if (i < array1.length - 1) {
                array1[i] = array1[i] + "!";
            }
            if (i > 0) {
                array1[i] = array1[i].substr(1, array1[i].length - 1);
            }
            if (array1[i].indexOf(".") > 0) {
                let array2 = array1[i].split(".");
                for (let j = 0; j < array2.length; j++){
                    if (j < array2.length - 1) {
                        array2[j] = array2[j] + ".";
                    }
                    if (j > 0) {
                        array2[j] = array2[j].substr(1, array2[j].length - 1);
                    }
                    if (array2[j] != "") {
                        array.push(array2[j]);
                    }
                }
            } else if (array1[i] != "") {
                array.push(array1[i]);
            }
        }
        var len = array.length;
        for (let i = 0; i < len; i++) {
            let index = parseInt(Math.random() * (len - i));
            let temp = array[index];
            array[index] = array[len - i - 1];
            array[len - i - 1] = temp;
        }
        //console.log(array);
        let str = "";
        for (let i = 0; i < len; i++) {
            str = str + array[i] + " ";
        }
        console.log(str);
    }else {
        throw new UserException("Function randomizeSentences: InvalidInput -- NoFullSentences");
    }
}

try {
    let x = 5, y = 3, z = 10;
    console.log(`The sum of the squares of ${x}, ${y} and ${z} is: ${sumOfSquares(x, y, z)}`);
} catch (e) {
    console.log(e.message, e.name); // pass exception object to err handler
}

try {
    sayHelloTo();
} catch (e) {
    console.log(e.message, e.name); // pass exception object to err handler
}

try {
    sayHelloTo("Phil");
} catch (e) {
    console.log(e.message, e.name); // pass exception object to err handler
}

try {
    sayHelloTo("Phil", "Barresi");
} catch (e) {
    console.log(e.message, e.name); // pass exception object to err handler
}

try {
    sayHelloTo("Phil", "Barresi", "Mr.");
} catch (e) {
    console.log(e.message, e.name); // pass exception object to err handler
}

try {
    cupsOfCoffee(5);
} catch (e) {
    console.log(e.message, e.name); // pass exception object to err handler
}

try {
    let fullString = "hello world";
    let subString = "o";
    console.log(`Substring "${subString}" occurs ${occurrencesOfSubstring(fullString, subString)} times in string "${fullString}"`);
} catch (e) {
    console.log(e.message, e.name); // pass exception object to err handler
}

try {
    let fullString = "helllllllo class";
    let subString = "ll";
    console.log(`Substring "${subString}" occurs ${occurrencesOfSubstring(fullString, subString)} times in string "${fullString}"`);
} catch (e) {
    console.log(e.message, e.name); // pass exception object to err handler
}

try {
    let paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
    randomizeSentences(paragraph);
} catch (e) {
    console.log(e.message, e.name); // pass exception object to err handler
}
