module.exports = {
    printTriangle: function (size) {
        if (size === undefined || typeof size !== "number") {
            throw "size is not a number";
        }

        for (let i = 0; i < size; i++) {
            let str = "";
            for (let j = 0; j < size - i - 1; j ++)
                str = str + " ";
            str = str + "/";
            for (let j = 0; j < i * 2; j ++) {
                if (i == size - 1)
                    str = str + "-";
                else
                    str = str + " ";
            }
            str = str + "\\";
            console.log(str);
        }
    },
    printSquare: function (size) {
        if (size === undefined || typeof size !== "number") {
            throw "size is not a number";
        }

        if (size < 2) {
            throw "size must be greater than 2";
        }

        for (let i = 0; i < size; i++) {
            let str = "|";
            for (let j = 0; j < size; j ++) {
                if (i == 0 || i == size - 1)
                    str = str + "-";
                else
                    str = str + " ";
            }
            str = str + "|";
            console.log(str);
        }
    },
    printRhombus: function (size) {
        if (size === undefined || typeof size !== "number") {
            throw "size is not a number";
        }

        if (size % 2 !== 0) {
            throw "size must be an even number";
        }

        if (size < 2) {
            throw "size must be greater than 2";
        }

        for (let i = 0; i < size / 2; i++) {
            let str = "";
            for (let j = 0; j < size / 2 - i - 1; j ++)
                str = str + " ";
            str = str + "/";
            for (let j = 0; j < (i + 1) * 2 - 1; j ++) {
                if (i == 0)
                    str = str + "-";
                else
                    str = str + " ";
            }
            str = str + "\\";
            console.log(str);
        }
        for (let i = 0; i < size / 2; i++) {
            let str = "";
            for (let j = 0; j < i; j ++)
                str = str + " ";
            str = str + "\\";
            for (let j = 0; j < (size / 2 - i) * 2 - 1; j ++) {
                if (i == (size / 2) - 1)
                    str = str + "-";
                else
                    str = str + " ";
            }
            str = str + "/";
            console.log(str);
        }
    }
}
