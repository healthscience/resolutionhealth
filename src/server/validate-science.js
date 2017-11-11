/**
* LKN validate science
*
* LKN science valication class
*
*
* @package    ScienceValid
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/

/**
* ScienceValid constructer
* @class ScienceValid
*/
var ScienceValid = function() {


};

/**
* check compatibilty
* @method validatdString
*
*/
ScienceValid.prototype.validatdString = function(socket, CycleHolder) {

  CycleHolder.science = 1;
console.log('cyclehoder in science');
console.log(CycleHolder);
  socket.emit('validate-science', 'passed');

};

module.exports = ScienceValid;
