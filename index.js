web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//code = fs.readFileSync('Voting.sol').toString()
//compiledCode = solc.compile(code)
//copy the compiledCode.contracts[':Voting'].interface after running the above command to get the abi definition
//abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
// the above abi is calculated below after pasting the compiledCode.contracts[':Voting'].interface

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

//VotingContract = web3.eth.contract(abiDefinition)

VotingContract = web3.eth.contract(abi);


//byteCode = compiledCode.contracts[':Voting'].bytecode
//deployedContract = VotingContract.new(['Vivek','Prabhat','Utsav'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
// In your nodejs console, execute "contractInstance.address" to get the address at which the contract is deployed and change the line below to use your deployed address

contractInstance = VotingContract.at('0x5702ca35474141f67d2bb8d3122f2b54d59efed5');
candidates = {"Vivek": "candidate-1", "Prabhat": "candidate-2", "Utsav": "candidate-3"}

function voteForCandidate() {
  candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});
