let myObj = {
    hello: "World",
    num: 1,
    bool: true,
    myFn: () => {
        return "Hello";
    }
};

console.log(myObj);

myObj["new-key"] = "I am a new key";
myObj.directlyAddedKey = "I've been added";

let keyName = "myStrKey";
myObj[keyName] = "This was made dynamically";

myObj.hello = "Hello, world!";
console.log(myObj);

console.log(myObj.myFn());