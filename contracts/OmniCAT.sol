pragma solidity ^0.4.24;

contract OmniCAT {
    struct Contribution {
        mapping (bytes32 => bool) stored; // stored["dass42"] = true
        uint8[42] dass42; // these two seem out of place from their own contract
        uint16[4] ironLevels;
    }
    // or address => Contribution[]
    mapping (address => Contribution) contributors;

    function compareStrings(bytes32 a, bytes32 b) internal pure returns (bool) {
        return keccak256(bytes32ToBytes(a)) == keccak256(bytes32ToBytes(b));
    }

    function bytes32ToBytes(bytes32 data) internal pure returns (bytes) {
        uint i = 0;
        while (i < 32 && uint(data[i]) != 0) {
            ++i;
        }
        bytes memory result = new bytes(i);
        i = 0;
        while (i < 32 && data[i] != 0) {
            result[i] = data[i];
            ++i;
        }
        return result;
    }
}
