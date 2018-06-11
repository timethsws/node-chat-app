
class Users {
    constructor() {
        this.users = []
    }

    addUser(id, name, room) {
        var user = {
            id,
            name,
            room
        }
        this.users.push(user);

        return user
    }

    removeUser(id) {
        var user = this.getUser(id)
        if (user) {
            var tempUsers = this.users.filter((user) => user.id !== id)
            // console.log(tempUsers);
            this.users = tempUsers;
        }
        return user;
    }

    getUser(id) {
        var user = this.users.filter((user) => user.id === id);
        // console.log(user)
        return user[0];
    }

    getUserList(room) {
        var res = this.users.filter((user) => user.room === room);
        var namesArray = res.map((user) => {
            return user.name;
        })
        return namesArray;
    }
}

module.exports = {
    Users
}


// class Person {
//     constructor (name,age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return ` ${this.name} is ${this.age} year(s) old`
//     }
// }

// var me = new Person('Timeth' , 21);
// console.log('this.name' , me.name);
// console.log('this.age', me.age)
// console.log('description',me.getUserDescription())
