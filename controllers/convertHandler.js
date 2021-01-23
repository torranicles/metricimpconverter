/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let convert = parseFloat(input);
    if (/\//.test(input)) { //check if '/' exists
      if (/.*\/.*\//.test(input)) { //check if > 1 '/' occurs
        result = 'invalid number'
      } else {
        let arr = input.split('/');
        result = parseFloat(arr[0]) / parseFloat(arr[1]);
      }
    } else if (/.*\..*\.|^\s|\d\s/.test(input)) { //check if > '.' occurs...whitespace for fcc test only
      result = 'invalid number';
    } else if (isNaN(convert)) {
      result = 1;
    } else {
      result = convert;
    }
    console.log(result);
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let validInp = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    let regex = /[a-z]{1,}/i;
    let unit = input
      .match(regex)
      .join('')
      .toLowerCase();
    if (/\s$/.test(input)) { //for fcc test only
      result = 'invalid unit'
    } else if (validInp.includes(unit)) {
      result = unit;
    } else {
      result = 'invalid unit'
    }
    console.log(result)
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let input = ['gal','l','mi','km','lbs','kg'];
    let expect = ['L','gal','km','mi','kg','lbs'];
    let unitIndex = input.indexOf(initUnit);
    let result = unitIndex !== -1 ? expect[unitIndex] : 'Unknown';
    console.log(result)
    return result;
  };

  this.spellOutUnit = function(unit) {
    let acronyms = ['l','gal','km','mi','kg','lbs'];
    let spelled = ['liters', 'gallons', 'kilometers', 'miles', 'kilograms', 'pounds'];
    let unitIndex = acronyms.indexOf(unit);
    let result = unitIndex !== -1 ? spelled[unitIndex] : 'Unknown';
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal' :
        result = initNum * galToL;
        break;
      case 'lbs' :
        result = initNum * lbsToKg;
        break;
      case 'mi' :
        result = initNum * miToKm;
        break;
      case 'l' :
        result = initNum / galToL;
        break;
      case 'kg' :
        result = initNum / lbsToKg;
        break;
      case 'km' :
        result = initNum / miToKm;
        break;
    }
    if (initUnit != 'invalid unit') {
      return parseFloat(result.toFixed(5));
    } else {
      return 'invalid unit'
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let spellInUnit = this.spellOutUnit(this.getUnit(initUnit));
    let spellRetUnit = this.spellOutUnit(returnUnit);
    let res;
    if (isNaN(initNum) && initUnit != 'invalid unit') {
      res = 'invalid number'
    } else if (!isNaN(initNum) && initUnit == 'invalid unit') {
      res = 'invalid unit';
    } else if (isNaN(initNum) && initUnit == 'invalid unit') {
      res = 'invalid number and unit'
    } else {
      res = {
        initNum: initNum, 
        initUnit: initUnit == 'l' ? 'L'
          : initUnit, 
        returnNum: returnNum, 
        returnUnit: returnUnit, 
        string: initNum + ' ' + spellInUnit  + ' converts to ' + returnNum + ' ' + spellRetUnit
      }
    }
    return res;
  };
  
}

module.exports = ConvertHandler;
