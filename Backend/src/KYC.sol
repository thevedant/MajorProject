// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KycApproval {
    // Storage
    mapping(address => bytes32) public userHash;   // userAddress => userHash
    mapping(address => bytes32) public issuerHash; // userAddress => issuerHash

    // The issuer is the sole approver (set at deploy time)
    address public immutable issuer;

    // Events
    event KycApproved(
        address indexed userAddress,
        bytes32 userHash,
        bytes32 issuerHash
    );

    // Set issuer during deployment
    constructor(address _issuer) {
        issuer = _issuer;
    }

    // Approve KYC (callable ONLY by issuer)
    function approveKyc(
        address _userAddress,
        bytes32 _userHash,
        bytes32 _issuerHash
    ) external onlyIssuer {
        userHash[_userAddress] = _userHash;
        issuerHash[_userAddress] = _issuerHash;
        emit KycApproved(_userAddress, _userHash, _issuerHash);
    }

    // Modifier: Restrict to issuer
    modifier onlyIssuer() {
        require(msg.sender == issuer, "Only issuer can approve");
        _;
    }
}