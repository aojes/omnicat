pragma solidity ^0.4.18;

contract SimpleStorage {
  uint storedData;
  string message;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
  function setMessage(string _msg) public {
    message = _msg;
  }
  function getMessage() public view returns (string) {
    return message;
  }
}
