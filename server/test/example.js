/**
 * Calc
 * simple calculator class
 * @author Femi
 */
class Calc {
  /**
   * addNum
   * adds two numbers
   * @param {Number} a
   * @param {Number} b
   * @return {Number} res
   */
  addNum(a, b) {
    this.a = a;
    this.b = b;
    let answer = 0;

    answer = Number(a) && Number(b)
      ? answer = parseInt(a, 10) + parseInt(b, 10)
      : 'Please supply numbers';

    return answer;
  }
}

module.exports = Calc;
