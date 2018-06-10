const expect = require('expect')

var {generateMessage, generateLocationMessage} = require('./message')

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

describe('generateLocationMessage', () => {
    it ('Should generate correct location message' ,() => {
        var from = 'Timeth';
        var lat = 1234567890;
        var lng = 1234567890
        var url = `https://www.google.com/maps?q=${lat},${lng}`
        
        var res = generateLocationMessage(from,lat,lng);

        expect (res.from).toBe(from);
        expect(res.url).toBe(url)
        expect(res.createdAt).toExist()
;
    })
})