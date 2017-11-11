/**
* LKN consensus and knowledge token value issuance
*
* LKN consensus KT class
*
*
* @package    ConsensusKT
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/

/**
* ConsensusKT constructer
* @class ConsensusKT
*/
var ConsensusKT = function() {


};

/**
* check compatibilty
* @method startConsensus
*
*/
ConsensusKT.prototype.startConsensus = function(socket) {

  socket.emit('consensus-kt', 'none');

};

module.exports = ConsensusKT;
