/**
*  Dsensor Dmap
*  Smart Contract
*
**/
pragma solidity ^0.4.6;

contract DmapContract {

  address peer;

  struct Mapdetail {

    string dmname;
    string dmdescription;
    string dmcode1;
    string dmcode2;
    string dmcode3;
    string mcodehash1;
    string mcodehash2;

  }

  struct Dappdetail {

    string dappdirectory;

  }

  struct DMdatamodel {

    address datamodelscid;

  }

  struct Dsampling {

    address dcomputescid;

  }

  struct Dpeerlist {

    uint invitesent;
    address storagecontract;

  }


  uint sampleCount;
  uint listCount;
  uint acceptlistCount;

  struct predPath {

    string ppath1;
    string ppath2;
    string ppath3;

  }

  struct Dscoring {

    uint outcomescore;
    uint scoredate;

  }

  Mapdetail public liveDmapinfo;
  Dappdetail public liveDappinfo;
  DMdatamodel public liveDatamodel;
  mapping(address => Dsampling) public liveSample;
  mapping(address => Dpeerlist) public livePeerlist;
  mapping(address => predPath) public livePrection;
  mapping(address => Dscoring) public liveScoring;

   // Constructor
   function DmapContract(){

       peer = msg.sender;
       sampleCount = 0;
       listCount = 0;
       acceptlistCount = 0;

   }

  function setMappingDetail (string x, string y) {

    liveDmapinfo.dmname = x;
    liveDmapinfo.dmdescription = y;

  }

  function setMappingDetailcodeurl (string za, string zb, string zc) returns (bool) {

    liveDmapinfo.dmcode1 = za;
    liveDmapinfo.dmcode2 = zb;
    liveDmapinfo.dmcode3 = zc;

    return true;

  }

  function setMappingDetailcodehash (string zf, string zg) returns (bool) {

    liveDmapinfo.mcodehash1 = zf;
    liveDmapinfo.mcodehash2 = zg;

    return true;

  }

  function setDataModel (address dataMscid) {

    liveDatamodel.datamodelscid = dataMscid;

  }

  function setDapp (string dappdir) {

      liveDappinfo.dappdirectory = dappdir;

  }

  function setDsampling (address dcompute) {

    liveSample[msg.sender].dcomputescid = dcompute;
    sampleCount += 1;

  }

  function setPeerInvite (address invited) {

    livePeerlist[invited].invitesent = 1;
    listCount += 1;

  }

  function setPeerInviteStorageAddress (address storagesc) {

    livePeerlist[msg.sender].storagecontract = storagesc;
    acceptlistCount += 1;

  }

  function setPredpath (string ppath1, string ppath2, string ppath3) {

    livePrection[msg.sender].ppath1 = ppath1;
    livePrection[msg.sender].ppath2 = ppath2;
    livePrection[msg.sender].ppath3 = ppath3;

  }

  function setDscoring (uint score) {

    liveScoring[msg.sender].outcomescore = score;
    liveScoring[msg.sender].scoredate = now;

  }

  /** Start a new sampling smart contract with ID of this Dmap contract */
  function startNewSampling (address dmapiAddr) {

    // create new instance of sampling contract
    //return address(new samplingContract());

  }

  function getDmapDetail() constant returns(string dmn, string dmd, string dmc, string dme, string dmf) {

   dmn = liveDmapinfo.dmname;
   dmd = liveDmapinfo.dmdescription;
   dmc = liveDmapinfo.dmcode1;
   dme = liveDmapinfo.dmcode2;
   dmf = liveDmapinfo.dmcode3;

  }

  function getDmapDetailchash() constant returns(string dmcid, string dmcidb) {

    dmcid = liveDmapinfo.mcodehash1;
    dmcidb = liveDmapinfo.mcodehash2;

  }

  function getDmapDapp() constant returns(string dappdir) {

    dappdir = liveDappinfo.dappdirectory;

  }

  function getDataModel() constant returns(address dmscid) {

   dmscid = liveDatamodel.datamodelscid;

  }

  function getDsampling() constant returns(address chosenpeer) {

    chosenpeer = liveSample[msg.sender].dcomputescid;

  }

  function getDpeerlist() constant returns(uint peerstatus) {

    peerstatus = livePeerlist[msg.sender].invitesent;

  }

  function getDsamplingCount() constant returns(uint peercount) {

    peercount = sampleCount;

  }

  function getDinviteCount() constant returns(uint peercount) {

    peercount = listCount;

  }

  function getPredpath() constant returns(string path1, string path2, string path3) {

    path1 = livePrection[msg.sender].ppath1;
    path2 = livePrection[msg.sender].ppath2;
    path3 = livePrection[msg.sender].ppath3;

  }

  function getDscoring() constant returns(uint score, uint scoredate ) {

    score = liveScoring[msg.sender].outcomescore;
    scoredate = liveScoring[msg.sender].scoredate;

  }

  function remove() {
    if (msg.sender == peer){
      selfdestruct(peer);
    }
  }

}
