let string1 = "This is the first string; it's block scoped."; /*块作用域*/
const string2 = "This is the second string; it is a constant.";
var string3 = "This is the third string; it's functionally scoped.";
let string4 = `string1 is: ${string1}`;

console.log(string1);
console.log(string2);
console.log(string3);
console.log(string4);

string1 = "This is the first string; again it should still be block scoped.";
console.log(string1);

let string5 = "Hello, my name is";
string5 = string5 + " Huidi Jia.";
console.log(string5);

console.log(string5.length);

console.log(string5.split(" "));
console.log(string5.split(" ").length);
