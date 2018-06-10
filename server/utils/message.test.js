const expect = require('expect')

var {generateMessage} = require('./message')

describe('generateMessage' ,() => {
    it('Should generate correct message object', () => {
        var from = 'Timeth';
        var text = 'Hey how are you'
        var res = generateMessage(from,text)

        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        // expect(res.createdAt).toExist;
        expect(res.createdAt).toBeA('number');
        

    })
})