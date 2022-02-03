interface User {
    name: string;
    id: number;
}

// let userInvalid: User = {
//     username: 'bad kojin', // username != name as defined by interface
//     id: '1' // typeof id != string as defined by interface
// }

let userValid: User = {
    name: 'kojin',
    id: 0
}

console.log(userValid)