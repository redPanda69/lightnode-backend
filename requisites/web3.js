/*
    @title --> Web3 requisites ,
    @description --> Functions and event listeners for uptadating db w.r.t onchain results.
*/


// Initializations
const ethers = require("ethers")
var provider = new ethers.providers.InfuraProvider('goerli')
var abi = require("../contracts/abi/lightnode.json")
var admin = new ethers.Wallet("",provider)
var lightnode = new ethers.Contract("0x6F26B417f2622eD65A964b37Db815998849C2518",abi,admin);

// functions
async function depositToContract(){
    let stakedEther = parseFloat(ethers.utils.formatEther(await lightnode.getBufferedEther()))
    let maxPoolEther = parseFloat(ethers.utils.formatEther(await lightnode.DEPOSIT_SIZE()))
    let depositRole = await lightnode.DEPOSIT_ROLE()
    if (stakedEther <= maxPoolEther){
        await lightnode.connect(admin).grantRole(depositRole,admin.address)
        await lightnode.connect(admin).depositBufferedEther(150)
        await lightnode.connect(admin).revokeRole(depositRole,admin.address)
    }
}
exports.deposit = depositToContract
