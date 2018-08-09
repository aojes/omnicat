pragma solidity ^0.4.24;

import "./OmniCAT.sol";

contract IronLevels is OmniCAT {

    mapping (bytes32 => uint8) optimal;
    mapping (bytes32 => uint8[2][2]) normal;
    mapping (bytes32 => uint16[2][2]) suboptimal;

    constructor() public payable {
        optimal["SerumIron"] = 20;
        normal["SerumIron"] = [[15, 19], [21, 25]];
        suboptimal["SerumIron"] = [[10, 14], [26, 33]];

        optimal["TransferrinIbc"] = 60;
        normal["TransferrinIbc"] = [[55, 59], [61, 65]];
        suboptimal["TransferrinIbc"] = [[45, 54], [66, 70]];

        optimal["TransferrinSaturation"] = 40;
        normal["TransferrinSaturation"] = [[35, 39], [41, 45]];
        suboptimal["TransferrinSaturation"] = [[16, 34], [46, 50]];

        optimal["SerumFerritinAssay"] = 150;
        normal["SerumFerritinAssay"] = [[130, 149], [151, 180]];
        suboptimal["SerumFerritinAssay"] = [[uint16(20), uint16(129)], [uint16(181), 290]];
    }

    function setValues(address _contributor, uint16 _si, uint16 _tibc, uint16 _ts, uint16 _sfa) public payable {
        contributors[_contributor].ironLevels[0] = _si;   // SerumIron
        contributors[_contributor].ironLevels[1] = _tibc; // TransferrinIbc
        contributors[_contributor].ironLevels[2] = _ts;   // TransferrinSaturation
        contributors[_contributor].ironLevels[3] = _sfa;  // SerumFerritinAssay
        contributors[_contributor].stored["ironLevels"] = true;
    }

    // Note: use returned _submittedValue and _optimalValue
    // on the client side to find percent from optimal
    function checkValue(bytes32 _name, uint16 _value) public view returns (string _report, uint16 _submittedValue, int8 _optimalValue) {
        if (compareStrings(_name, "SerumIron")) {
            if (_value == optimal["SerumIron"]) {
                _report = "Optimal SerumIron Level";
            } else if (_value >= normal["SerumIron"][0][0] && _value <= normal["SerumIron"][0][1]) {
                _report = "Normal Lower SerumIron Level";
            } else if (_value >= normal["SerumIron"][1][0] && _value <= normal["SerumIron"][1][1]) {
                _report = "Normal Higher SerumIron Level";
            } else if (_value >= suboptimal["SerumIron"][0][0] && _value <= suboptimal["SerumIron"][0][1]) {
                _report = "Suboptimal Lower SerumIron Level";
            } else if (_value >= suboptimal["SerumIron"][1][0] && _value <= suboptimal["SerumIron"][1][1]) {
                _report = "Suboptimal Higher SerumIron Level";
            } else if (_value < suboptimal["SerumIron"][0][0]) {
                _report = "Abnormal Lower SerumIron Level";
            } else if (_value > suboptimal["SerumIron"][1][0]) {
                _report = "Abnormal Higher SerumIron Level";
            }
        } else if (compareStrings(_name, "TransferrinIbc")) {
            if (_value == optimal["TransferrinIbc"]) {
                _report = "Optimal TransferrinIBC Level";
            } else if (_value >= normal["TransferrinIbc"][0][0] && _value <= normal["TransferrinIbc"][0][1]) {
                _report = "Normal Lower TransferrinIBC Level";
            } else if (_value >= normal["TransferrinIbc"][1][0] && _value <= normal["TransferrinIbc"][1][1]) {
                _report = "Normal Higher TransferrinIBC Level";
            } else if (_value >= suboptimal["TransferrinIbc"][0][0] && _value <= suboptimal["TransferrinIbc"][0][1]) {
                _report = "Suboptimal Lower TransferrinIBC Level";
            } else if (_value >= suboptimal["TransferrinIbc"][1][0] && _value <= suboptimal["TransferrinIbc"][1][1]) {
                _report = "Suboptimal Higher TransferrinIBC Level";
            } else if (_value < suboptimal["TransferrinIbc"][0][0]) {
                _report = "Abnormal Lower TransferrinIBC Level";
            } else if (_value > suboptimal["TransferrinIbc"][1][0]) {
                _report = "Abnormal Higher TransferrinIBC Level";
            }
        } else if (compareStrings(_name, "TransferrinSaturation")) {
            if (_value == optimal["TransferrinSaturation"]) {
                _report = "Optimal TransferrinSaturation Level";
            } else if (_value >= normal["TransferrinSaturation"][0][0] && _value <= normal["TransferrinSaturation"][0][1]) {
                _report = "Normal Lower TransferrinSaturation Level";
            } else if (_value >= normal["TransferrinSaturation"][1][0] && _value <= normal["TransferrinSaturation"][1][1]) {
                _report = "Normal Higher TransferrinSaturation Level";
            } else if (_value >= suboptimal["TransferrinSaturation"][0][0] && _value <= suboptimal["TransferrinSaturation"][0][1]) {
                _report = "Suboptimal Lower TransferrinSaturation Level";
            } else if (_value >= suboptimal["TransferrinSaturation"][1][0] && _value <= suboptimal["TransferrinSaturation"][1][1]) {
                _report = "Suboptimal Higher TransferrinSaturation Level";
            } else if (_value < suboptimal["TransferrinSaturation"][0][0]) {
                _report = "Abnormal Lower TransferrinSaturation Level";
            } else if (_value > suboptimal["TransferrinSaturation"][1][0]) {
                _report = "Abnormal Higher TransferrinSaturation Level";
            }
        } else if (compareStrings(_name, "SerumFerritinAssay")) {
            if (_value == optimal["SerumFerritinAssay"]) {
                _report = "Optimal SerumFerritinAssay Level";
            } else if (_value >= normal["SerumFerritinAssay"][0][0] && _value <= normal["SerumFerritinAssay"][0][1]) {
                _report = "Normal Lower SerumFerritinAssay Level";
            } else if (_value >= normal["SerumFerritinAssay"][1][0] && _value <= normal["SerumFerritinAssay"][1][1]) {
                _report = "Normal Higher SerumFerritinAssay Level";
            } else if (_value >= suboptimal["SerumFerritinAssay"][0][0] && _value <= suboptimal["SerumFerritinAssay"][0][1]) {
                _report = "Suboptimal Lower SerumFerritinAssay Level";
            } else if (_value >= suboptimal["SerumFerritinAssay"][1][0] && _value <= suboptimal["SerumFerritinAssay"][1][1]) {
                _report = "Suboptimal Higher SerumFerritinAssay Level";
            } else if (_value < suboptimal["SerumFerritinAssay"][0][0]) {
                _report = "Abnormal Lower SerumFerritinAssay Level";
            } else if (_value > suboptimal["SerumFerritinAssay"][1][0]) {
                _report = "Abnormal Higher SerumFerritinAssay Level";
            }
        } else {
            _report = "Please check name is one of SerumIron, TransferrinIbc, TransferrinSaturation, or SerumFerritinAssay";
        }
        return (_report, _value, int8(getOptimalValues(_name)));
    }

    function getOptimalValues(bytes32 _name) public view returns (uint8) {
        if (compareStrings(_name, "SerumIron")) {
            return optimal["SerumIron"];
        } else if (compareStrings(_name, "TransferrinIbc")) {
            return optimal["TransferrinIbc"];
        } else if (compareStrings(_name, "TransferrinSaturation")) {
            return optimal["TransferrinSaturation"];
        } else if (compareStrings(_name, "SerumFerritinAssay")) {
            return optimal["SerumFerritinAssay"];
        }
    }

    function getNormalValues(bytes32 _name) public view returns (uint8[2][2]) {
        if (compareStrings(_name, "SerumIron")) {
            return normal["SerumIron"];
        } else if (compareStrings(_name, "TransferrinIbc")) {
            return normal["TransferrinIbc"];
        } else if (compareStrings(_name, "TransferrinSaturation")) {
            return normal["TransferrinSaturation"];
        } else if (compareStrings(_name, "SerumFerritinAssay")) {
            return normal["SerumFerritinAssay"];
        }
    }

    function getSuboptimalValues(bytes32 _name) public view returns (uint16[2][2]) {
        if (compareStrings(_name, "SerumIron")) {
            return suboptimal["SerumIron"];
        } else if (compareStrings(_name, "TransferrinIbc")) {
            return suboptimal["TransferrinIbc"];
        } else if (compareStrings(_name, "TransferrinSaturation")) {
            return suboptimal["TransferrinSaturation"];
        } else if (compareStrings(_name, "SerumFerritinAssay")) {
            return suboptimal["SerumFerritinAssay"];
        }
    }
}
