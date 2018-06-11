const expect = require('expect')

const {isRealString} = require('./validation');
describe('isRealString',() => {
    it('Should reject non String values', ()=> {
        var res = isRealString(12123)
        expect(res).toBe(false)
    })

    it('Should reject only space Strings', ()=>{
        var res = isRealString("    ")
        expect(res).toBe(false)
    })

    it('Should allow strings with non-space characters',() => {
        var res = isRealString('this is a real String')
        expect(res).toBe(true);
    })
})