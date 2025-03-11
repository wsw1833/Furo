// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.21;

import {Ownable} from "@rmrk-team/evm-contracts/contracts/RMRK/access/Ownable.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/library/RMRKErrors.sol";

abstract contract TokenBase is Ownable {
    string private _name;
    string private _symbol;

    uint256 private _nextId;
    uint256 internal _totalSupply;

    /**
     * @notice Initializes the smart contract with a given maximum supply and minting price.
     * @param name_ Name of the token collection
     * @param symbol_ Symbol of the token collection
     */
    constructor(
        string memory name_,
        string memory symbol_
    ) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @notice Used to retrieve the total supply of the tokens in a collection.
     * @return totalSupply_ The number of tokens in a collection
     */
    function totalSupply() public view virtual returns (uint256 totalSupply_) {
        totalSupply_ = _totalSupply;
    }

    /**
     * @notice Used to retrieve the collection name.
     * @return name_ Name of the collection
     */
    function name() public view virtual returns (string memory name_) {
        name_ = _name;
    }

    /**
     * @notice Used to retrieve the collection symbol.
     * @return symbol_ Symbol of the collection
     */
    function symbol() public view virtual returns (string memory symbol_) {
        symbol_ = _symbol;
    }

    /**
     * @notice Used to calculate the token IDs of tokens to be minted.
     * @param numToMint Amount of tokens to be minted
     * @return nextToken The ID of the first token to be minted in the current minting cycle
     * @return totalSupplyOffset The ID of the last token to be minted in the current minting cycle
     */
    function _prepareMint(
        uint256 numToMint
    ) internal virtual returns (uint256 nextToken, uint256 totalSupplyOffset) {
        if (numToMint == uint256(0)) revert RMRKMintZero();

        unchecked {
            nextToken = _nextId + 1;
            _nextId += numToMint;
            _totalSupply += numToMint;
            totalSupplyOffset = _nextId + 1;
        }
    }
}