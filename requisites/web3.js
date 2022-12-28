/*
    @title --> Web3 requisites ,
    @description --> Functions and event listeners for uptadating db w.r.t onchain results.
*/

// Initializations
const Web3 = require("web3")
const abi = require("./contracts/abi/lightnode.json")
const web3 = new Web3("https://goerli.infura.io/v3/ad9d96f0bcb147648c2a21033c850e9f")
const contract = new web3.eth.Contract(abi,"0x6F26B417f2622eD65A964b37Db815998849C2518");
const data = require("../db/monthly-pool.json")
const fs = require("fs");
const { json } = require("express");
const months = ["jan","feb","mar","apr","may","jun","jul","aug","sept","oct","nov","dec"]
const date = new Date()
// Event Listening.....
contract.getPastEvents('Submitted',{fromBlock:0},(e,event)=>{
    for(let i = 0 ; i < event.length;i++){
        let x = event[i]
        let result = x.returnValues
        let m = months[date.getMonth()]
        let stake = Number(result.amount)
        data[m].sales =  stake + Number(data[m].sales)
        if (!data[m].data[result.sender]){
            data[m].data[result.sender] = {stakes:0,rewards:0,apiUrl:"https://localhost:3001/staker/"+result.sender}
        }
        data[m].data[result.sender].stakes += stake
    }
    fs.writeFileSync('../db/monthly-pool.json', JSON.stringify(data))
})


