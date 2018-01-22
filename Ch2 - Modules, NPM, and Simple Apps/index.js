const print = require("./printShape");
const prompt = require("prompt");

function getInfo() {
    console.log("You get 10 trangles, 10 squares and 10 rhombi with defult sizes");
    for (let i = 1; i < 11; i++) {
        console.log(`Triangle with size ${i}`);
        operationFunction = print.printTriangle(i);
    }
    for (let i = 2; i < 12; i++) {
        console.log(`Square with size ${i}`);
        operationFunction = print.printSquare(i);
    }
    for (let i = 1; i < 11; i++) {
        console.log(`Rhombus with size ${i * 2}`);
        operationFunction = print.printRhombus(i * 2);
    }

    console.log("test");
    prompt.start();

    const operation = {
        name: 'operation',
        description: 'Which operation do you want to do?\n\tt -- print a trangle\n\ts -- print a square\n\tr -- print a rhombus\n\t',
        type: 'string',
        default: 't',
        required: true
    };

    const sizePrompt = {
        name: 'size',
        description: 'What size of triangle do you want to print? \n\t(Size of square must be greater than 2)\n\t(Size of rhombus must be an even number and greater than 2)',
        type: 'number',
        required: true
    };

    const quitPrompt = {
        name: 'quit',
        description: 'Do you want to quit after this operation? (t -- yes or f -- no)',
        type: 'boolean',
        required: true
    };

    function stringToOperation(str) {
        if (!str) return "t";

        if (str === "s") return "s";

        if (str === "r") return "r";

        return "t";
    }

    prompt.get([operation, sizePrompt, quitPrompt], function (err, result) {

        //console.log('Command-line input received:');
       // console.log('  username: ' + result.username);
       // console.log('  email: ' + result.email);

        if (result) {
            let operation = stringToOperation(result.operation);
            let size = result.size;
            let quit = result.quit;

            let operationFunction = undefined;

            switch (operation) {
                case "t" :
                    console.log(`You get a triangle with size ${size}`);
                    operationFunction = print.printTriangle(size);
                    break;
                case "s" :
                    console.log(`You get a square with size ${size}`);
                    operationFunction = print.printSquare(size);
                    break;
                case "r" :
                    console.log(`You get a rhombus with size ${size}`);
                    operationFunction = print.printRhombus(size);
                    break;
            }


            if (!quit) {
                getInfo();
            }
            //console.log(result);

        } else if (err) {
            console.error(err);
        }

    });
    

}
getInfo();