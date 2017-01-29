// Example test
const expect = require('chai').expect;
const Calculator = require('./example');

describe('The addition function', () => {
  const calc = new Calculator();

  describe('#add two numbers', () => {
    const a = 5;
    const b = 6;

    it('Should return 11', () => {
      expect(calc.addNum(a, b)).to.equal(11);
    });
  });
  describe('#add one or two strings', () => {
    const a = 5;
    const b = 'five';

    it('Should throw an error', () => {
      expect(calc.addNum(a, b)).to.equal('Please supply numbers');
    });
  });
});
