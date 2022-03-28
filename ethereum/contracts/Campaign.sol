pragma solidity ^0.4.17;

contract CampaignFactory {

    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampain = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampain);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint appprovalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minium, address creator) public {
        manager = creator;
        minimumContribution = minium;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
    
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient:recipient,
            complete: false,
            appprovalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.appprovalCount++;
    }


    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.appprovalCount > (approversCount/2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}