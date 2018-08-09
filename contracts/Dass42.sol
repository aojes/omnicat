pragma solidity ^0.4.24;

import "./OmniCAT.sol";

contract Dass42 is OmniCAT {

    function setScores(address _contributor, uint8[42] _values) public payable {
        uint8 i = 0;
        while(i < 42) {
            contributors[_contributor].dass42[i] = _values[i++];
        }
        contributors[_contributor].stored["dass42"] = true;
    }

    // get submitted scores for a contributor
    // and then compute/display results in the client
    function getScores(address _contributor) public payable returns (uint8 _d, uint8 _a, uint8 _s) {
        require(contributors[_contributor].stored["dass42"], "no scores have been saved");
        _d = getDepressionScores(_contributor);
        _a = getAnxietyScores(_contributor);
        _s = getStressScores(_contributor);
        return (_d, _a, _s);
    }

    function getDepressionScores(address _contributor) internal view returns (uint8 _d) {
        // Depression statements # 3, 5, 10, 13, 16, 17, 21, 24, 26, 31, 34, 37, 38, 42

        _d = contributors[_contributor].dass42[2];
        _d += contributors[_contributor].dass42[4];
        _d += contributors[_contributor].dass42[9];
        _d += contributors[_contributor].dass42[12];
        _d += contributors[_contributor].dass42[15];
        _d += contributors[_contributor].dass42[16];
        _d += contributors[_contributor].dass42[20];
        _d += contributors[_contributor].dass42[23];
        _d += contributors[_contributor].dass42[25];
        _d += contributors[_contributor].dass42[30];
        _d += contributors[_contributor].dass42[33];
        _d += contributors[_contributor].dass42[36];
        _d += contributors[_contributor].dass42[37];
        _d += contributors[_contributor].dass42[41];
        return _d;
    }

    function getAnxietyScores(address _contributor) internal view returns (uint8 _a) {
        // Anxiety statements # 2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 30, 36, 40, 41
        _a = contributors[_contributor].dass42[1];
        _a += contributors[_contributor].dass42[3];
        _a += contributors[_contributor].dass42[6];
        _a += contributors[_contributor].dass42[8];
        _a += contributors[_contributor].dass42[14];
        _a += contributors[_contributor].dass42[18];
        _a += contributors[_contributor].dass42[19];
        _a += contributors[_contributor].dass42[22];
        _a += contributors[_contributor].dass42[24];
        _a += contributors[_contributor].dass42[27];
        _a += contributors[_contributor].dass42[29];
        _a += contributors[_contributor].dass42[35];
        _a += contributors[_contributor].dass42[39];
        _a += contributors[_contributor].dass42[40];
        return _a;
    }

    function getStressScores(address _contributor) internal view returns (uint8 _s) {
        // Stress statements # 1, 6, 8, 11, 12, 14, 18, 22, 27, 29, 32, 33, 35, 39
        _s = contributors[_contributor].dass42[0];
        _s += contributors[_contributor].dass42[5];
        _s += contributors[_contributor].dass42[7];
        _s += contributors[_contributor].dass42[10];
        _s += contributors[_contributor].dass42[11];
        _s += contributors[_contributor].dass42[13];
        _s += contributors[_contributor].dass42[17];
        _s += contributors[_contributor].dass42[21];
        _s += contributors[_contributor].dass42[26];
        _s += contributors[_contributor].dass42[28];
        _s += contributors[_contributor].dass42[32];
        _s += contributors[_contributor].dass42[33];
        _s += contributors[_contributor].dass42[34];
        _s += contributors[_contributor].dass42[38];
        return _s;
    }
}
