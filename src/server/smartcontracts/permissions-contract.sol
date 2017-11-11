/**
*  Dsensor Data Access Permissions
*  Smart Contract
*
**/
//pragma solidity ^0.4.4;

contract permissionsContract {


  string dataapi;

  mapping (address => string) owners;
  // sensorType = {};

  function setdataToken(address receiver, tokenin) returns(bool successful) {
  	owners[msg.sender] = tokenin;
  	return true;
  }


  function grantPermission(address addr) constant returns(string owner) {

    if(addr == msg.sender)
    {

      return owner[msg.sender];

    }
    else
    {
// failed not valid identity
      return 0;
    }

  }


}
