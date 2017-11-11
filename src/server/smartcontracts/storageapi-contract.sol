/**
*  Dsensor storage permission
*  Smart Contract
*
**/
pragma solidity ^0.4.6;

contract storageAccess {

    address owner;
    address sensorcontract;
    uint public creationTime = now;

    string storedToken;
    string grantToken;
    string jam;

    //PerList[] public liveplist;

    mapping (address => string) askers;
    mapping (address => uint) permlist;

    function storageAccess () {

        owner = msg.sender;
      }

    function setSensorAddress(address adin) {

      sensorcontract = adin;
    }

    function setToken(string x) {

        storedToken = x;
    }

    function getToken() constant returns(string) {
       return storedToken;
    }

    function setStorageOwner(address receiver, string x) returns(bool successful) {
      askers[receiver] = x;
      return true;
    }

    function setPermission(address receiver, uint x) returns(bool successful) {
      if (msg.sender != owner){
          return false;
        }
        else
        {
          permlist[receiver] = x;

          //return true;
        }
    }

    function getOwner(address addr) constant returns(string access) {
      return askers[addr];
    }

    function getPermissionLevel() constant returns(string res) {

      if(permlist[msg.sender] == 2){
          jam = storedToken;
          return jam;
      }
      else
      {
        jam = 'fail';
        return jam;
      }
    }

    function getHistoryPermGranted() constant returns (uint) {
      // check only the owner can call this function
      if (msg.sender == owner){
        // build array to return

        //for (uint i = 0; i < permlist.length; ++i) {

          //liveplist.push(permlist[i]);

        //}

        return 1;

      }

  }

}
