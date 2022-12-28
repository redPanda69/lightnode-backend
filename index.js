/*
    @title --> Web3 requisites ,
    @description --> Functions and event listeners for uptadating db w.r.t onchain results.
*/

// Initializations
const Web3 = require("web3")
const abi = require("./contracts/abi/lightnode.json")
const web3 = new Web3("wss://goerli.infura.io/ws/v3/ad9d96f0bcb147648c2a21033c850e9f")
const mysql = require('mysql2');
const contract = new web3.eth.Contract(abi,"0x6F26B417f2622eD65A964b37Db815998849C2518");

// Database Connection...
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Vyshnavp",
  database: "lightnode"
});



// Event Listening.....
contract.events.Submitted((event)=>{}).on('data',(event)=>{
  let result = event.returnValues
  let txType = "submit"
  con.query(`INSERT INTO transactions VALUES ('${result.sender}',${result.amount},'${txType}',NOW());`)
})
contract.events.Withdrawal((event)=>{}).on('data',(event)=>{
  let result = event.returnValues
  let txType = "witdrawal"
  con.query(`INSERT INTO transactions VALUES ('${result.sender}',${result.amount},'${txType}',NOW());`)
})

  // contract.getPastEvents('Submitted',{fromBlock:0},(e,event)=>{
  //   for(let i = 0 ; i < event.length;i++){
  //     let x = event[i]
  //     let result = x.returnValues
  //     let txType = "submit"
  //     con.query(`INSERT INTO transactions VALUES ('${result.sender}',${result.amount},'${txType}',NOW());`)
  //   }
  //   console.log("Added Trasactions to db.")

  // })

