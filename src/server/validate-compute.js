/**
* LKN validate compute
*
* LKN compute valication class
*
*
* @package    ComputeValid
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/

/**
* ComputeValid constructer
* @class ComputeValid
*/
var ComputeValid = function() {


};

/**
* check compatibilty
* @method validatdString
*
*/
ComputeValid.prototype.validatdString = function(socket, CycleHolder) {

  CycleHolder.compute = 1;
console.log('cyclehoder in compute');
console.log(CycleHolder);
  socket.emit('validate-compute', 'passed');

  var sumValidation = CycleHolder.datamodel + CycleHolder.data + CycleHolder.science + CycleHolder.compute;
  if(sumValidation == 4)
  {
    // all validated, display roll message button
  socket.emit('validation-complete', 'complete');


  }

};

module.exports = ComputeValid;
