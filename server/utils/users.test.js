const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users = new Users();

    beforeEach(()=> {
        users.users = [{
            id: '1',
            name : 'Mike',
            room :'Node Course'
        },{
            id: '2',
            name : 'Jen',
            room :'React Course'
        },{
            id: '3',
            name : 'Deb',
            room :'Node Course'
        }]
    })

    it('Should add new user', () => {
        var users = new Users();
        var user = {
            id : '123',
            name : 'Andrew',
            room : 'The office fans'
        }

        var resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user])


    })

    it('Should remove the user with id 1', ()=> {
        var user = users.removeUser('1')

        expect(users.users).toNotContain({id : '1', name :'Mike',room : 'Node Course'})
        expect(users.users.length).toBe(2);
        expect(user).toExist();
    })

    it('Should not remove the user with id 123', ()=> {
        var user = users.removeUser('123')
        expect(users.users.length).toBe(3);
        expect(user).toNotExist();
    })

    it('Should return the user with id 1', ()=> {
        var user = users.getUser('1')

        expect(user).toEqual({id : '1', name :'Mike',room : 'Node Course'})
    })

    it('Should not return the user with id 10', ()=> {
        var user = users.getUser('10')

        expect(user).toNotExist();
    })

    it('Should return the names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike','Deb'])
    });


    it('Should return the names for react course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen'])
    });
})