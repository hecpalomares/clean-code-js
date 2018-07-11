/** Testing **/
// Try to reach 100% coverage tool, wirting tests for every new feature/module introduced.
const assert = require('assert');

// Single concept per test

// Bad: single 'it' test holding three conceptal logics
describe('MakeMomentJSGreatAgain', () => {
  it('handles date boundaries', () => {
    let date;

    date = new MakeMomentJSGreatAgain('1/1/2015');
    date.addDays(30);
    assert.equal('1/31/2015', date);

    date = new MakeMomentJSGreatAgain('2/1/2016');
    date.addDays(28);
    assert.equal('02/29/2016', date);

    date = new MakeMomentJSGreatAgain('2/1/2015');
    date.addDays(28);
    assert.equal('03/01/2015', date);
  });
});

// Good: divide into single 'it' tests per conceptual logic
describe('MakeMomentJSGreatAgain', () => {

    it('handles 30-day months', () => {
        const date = new MakeMomentJSGreatAgain('1/1/2015');
        date.addDays(30);
        assert.equal('1/31/2015', date);
    });
    
    it('handles leap year', () => {
        const date = new MakeMomentJSGreatAgain('2/1/2016');
        date.addDays(28);
        assert.equal('02/29/2016', date);
    });
    
    it('handles non-leap year', () => {
        const date = new MakeMomentJSGreatAgain('2/1/2015');
        date.addDays(28);
        assert.equal('03/01/2015', date);
    });

});