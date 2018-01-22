const uuidV1 = require('uuid/v1');
const bcrypt = require("bcrypt-nodejs");

const usersList = [
    { 
        _id: uuidV1().toString(),
        username: "masterdetective123",
        password: bcrypt.hashSync("elementarymydearwatson"),
        firstname: "Sherlock",
        lastname: "Holmes",
        profession: "Detective",
        bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a \"consulting detective\" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard."
    },
    { 
        _id: uuidV1().toString(),
        username: "lemon",
        password: bcrypt.hashSync("damnyoujackdonaghy"),
        firstname: "Elizabeth",
        lastname: "Lemon",
        profession: "Writer",
        bio: "Elizabeth Miervaldis \"Liz\" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan."
    },
    { 
        _id: uuidV1().toString(),
        username: "theboywholived",
        password: bcrypt.hashSync("quidditch"),
        firstname: "Harry",
        lastname: "Potter",
        profession: "Student",
        bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles."
    }
];

let exportedMethods = {
    getUser: (userToGet) => {
        if (userToGet == undefined)
            return Promise.reject("No user provided");
        let user = usersList.filter(x => x.username == userToGet).shift();
        if (!user)
            return Promise.reject("No user found");
        return Promise.resolve(user);
    }
};

module.exports = exportedMethods;
