/**
*  Dsensor Compute Contract
*  Smart Contract
*
**/
pragma solidity ^0.4.6;


contract CPUcontract {

  address peer;

  struct cpuHistory {

    address dmapscid;
    uint start;
    uint stop;
    string environment;

  }

  uint creationtime;
  mapping(address => cpuHistory) public liveDmapHistory;

   // Constructor
   function CPUcontract(){

       peer = msg.sender;
       creationtime = now;

   }

  function setComputeStart (address dmapscidIN) {

    liveDmapHistory[dmapscidIN].dmapscid = dmapscidIN;
    liveDmapHistory[dmapscidIN].start = now;


  }

  function setComputeStop (address dmapscidIN) {

    liveDmapHistory[dmapscidIN].stop = now;


  }

  function getCPUhistory(address dmapscidIN) constant returns(uint dmn, uint dmd) {

   dmn = liveDmapHistory[dmapscidIN].start;
   dmd = liveDmapHistory[dmapscidIN].stop;

  }

  function remove() {
    if (msg.sender == peer){
      selfdestruct(peer);
    }
  }

}
