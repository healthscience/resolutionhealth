/**
*  Dsensor sensor api
*  Smart Contract
*
**/
pragma solidity ^0.4.4;

contract sensorContract {

  address peer;
  string sensorBrand;
  string sensorFirmware;
  address sensorcontract;

  struct Measure {
    string sensorType;
    string sensorMeasure;
    string sensorUnit;

  }

  mapping(address => uint) public owners;
  Measure public liveMeasure;

  // Constructor
  function sensorContract(){
      peer = msg.sender;
  }

  function setSensorOwner(address receiver) returns(bool successful) {
  	owners[msg.sender] = 1;
  	return true;
  }

  function setStorageContract(address adin) {

    sensorcontract = adin;
  }

  function setSensorBrand(string x) {
     sensorBrand = x;
  }

  function setSensorFirmware(string x) {
     sensorFirmware = x;
  }

  function setSensorMeasure(string x, string y, string z) {
     liveMeasure.sensorType = x;
     liveMeasure.sensorMeasure = y;
     liveMeasure.sensorUnit = z;

  }

  function getBrand() constant returns(string) {
     return sensorBrand;
  }

  function getOwner(address addr) constant returns(uint owner) {
     owner = owners[addr];
  }

  function getMeasure() constant returns(string a, string b, string c) {
    a = liveMeasure.sensorType;
    b = liveMeasure.sensorMeasure;
    c = liveMeasure.sensorUnit;
  }

  function remove() {
    if (msg.sender == peer){
      selfdestruct(peer);
    }
  }


}
