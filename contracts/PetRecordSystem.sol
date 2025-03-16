// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./TokenBase.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestable.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/extension/soulbound/RMRKSoulbound.sol";
import "@rmrk-team/evm-contracts/contracts/implementations/utils/RMRKTokenURIPerToken.sol";

error NotAPetOwner();
error SenderIsNotAProvider();

contract PetRecordSystem is TokenBase, RMRKNestable, RMRKSoulbound, RMRKTokenURIPerToken {

	enum Record {
		CheckUps,
		Surgery,
		Vaccination,
		Grooming,
		Deworming
	}

	struct PetRecord {
		uint256 tokenId;
		Record record;
	}
	
	struct Provider {
		uint256 petId;
		bool hasAccess;
		string name;
	}

    mapping (address => Provider) private _providers;
	mapping (uint256 => Record) public petRecords;
    
    event ServiceProviderRegistered(address indexed provider, string name, uint256 petId);
    event ServiceProviderRemoved(address indexed provider, uint256 timestamp);
    event ChildRecordAdded(uint256 indexed parentId, uint256 indexed childId, Record recordType, address provider);
    event PetOwnershipTransferred(uint256 indexed petId, address indexed from, address indexed to);

	constructor(
        string memory name,
        string memory symbol
    ) TokenBase(name, symbol) {
		_transferOwnership(msg.sender);
	} 

	function registerServiceProvider(address provider, string memory name, uint256 petId) public {
		_providers[provider] = Provider({
			petId: petId,
			hasAccess: true,
			name: name
		});
        emit ServiceProviderRegistered(provider, name, petId);
    }
    
    function removeServiceProvider(address provider, uint256 petId) public {
		require(_providers[provider].petId == petId, "Provider not assigned to this pet");

		_providers[provider].hasAccess = false;
        emit ServiceProviderRemoved(provider, block.timestamp);
    }
    
    function isServiceProvider(address provider, uint256 petId) public view returns (bool) {
        return _providers[provider].petId == petId && _providers[provider].hasAccess;
    }
    
    function getProviderName(address provider, uint256 petId) public view returns (string memory) {
		require(_providers[provider].petId == petId, "Provider not assigned to this pet");
        return _providers[provider].name;
    }

	function mintPet(
		address to,
		string memory tokenUri
	) external returns (uint256 tokenId) {
		(tokenId, ) = _prepareMint(1);

		_setTokenURI(tokenId, tokenUri);
		_safeMint(to, tokenId, "");
	}

	function addPetRecord(
		address to, 
		uint256 
		petTokenId, 
		Record record, 
		string memory tokenURI
	) external returns (uint256 tokenId) {
        if (ownerOf(petTokenId) != to) revert NotAPetOwner();
        if (!_providers[msg.sender].hasAccess) revert SenderIsNotAProvider();

        (tokenId, ) = _prepareMint(1);
        petRecords[tokenId] = record;
        _setTokenURI(tokenId, tokenURI);
        _nestMint(address(this), tokenId, petTokenId, "");
        _acceptChild(petTokenId, 0, address(this), tokenId);

        emit ChildRecordAdded(petTokenId, tokenId, record, msg.sender);
    }

	function getPetRecords(uint256 petTokenId) public view returns (PetRecord[] memory records) {
		Child[] memory children = childrenOf(petTokenId);
		records = new PetRecord[](children.length);

		for(uint256 i = 0; i < children.length; i++) {
			uint256 tokenId = children[i].tokenId;
			records[i] = PetRecord({
				tokenId: tokenId,
				record: petRecords[tokenId]
			});
		}
    }
    
    function getRecordType(uint256 recordTokenId) public view returns (Record) {
        return petRecords[recordTokenId];
    }

	function transferPetOwnership(
		address to, 
		uint256 petTokenId
	) external {
		safeTransferFrom(msg.sender, to, petTokenId);
        emit PetOwnershipTransferred(petTokenId, msg.sender, to);
    }

	function isTransferable(
        uint256 tokenId,
        address from,
        address to
    ) public view virtual override returns (bool) {
        return from == address(0) || to != address(0) && msg.sender == ownerOf(tokenId);
    }

	function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(RMRKSoulbound, RMRKNestable) {
        if (!isTransferable(tokenId, from, to))
            revert RMRKCannotTransferSoulbound();
    }

	function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(RMRKSoulbound, RMRKNestable) returns (bool) {
        return
            RMRKNestable.supportsInterface(interfaceId) ||
            RMRKSoulbound.supportsInterface(interfaceId);
    }
}