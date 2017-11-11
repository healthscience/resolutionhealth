/**
*  Dsensor quotes and credtis mechanism
*  Smart Contract
*
**/
pragma solidity ^0.4.6;

contract QuotesCredits {

  address peer;

  struct quotes {

    uint quoteUnits;
    address dmapscid;
    uint balance;

  }

  struct credits {

    uint creditUnits;
    address storagescid;
    uint balance;

  }

  quotes liveQuotes;
  credits liveCredits;

   // Constructor
   function QuotesCredits(){

       peer = msg.sender;
       liveQuotes.balance = 0;
       liveCredits.balance = 0;

   }

  function grantCredits () returns () {


  }

  function grantQuotes () returns () {

  }


  function getCredits() constant returns() {

  }

  function getQuotes() constant returns() {


  }

  function remove() {
    if (msg.sender == peer){
      selfdestruct(peer);
    }
  }

}
