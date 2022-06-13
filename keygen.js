var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const key = ec.genKeyPair();
const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex");

// console.log("Private Key: ", privateKey);
// console.log("Public key: ", publicKey);


const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
      {id: 'private', title: 'Privatekey'},
      {id: 'public', title: 'Publickey'},
     
    ]
  });
  
  const data = [
    {
      name: 'John',
      surname: 'dfhdsfhsdfh'
    }
  ];
  
  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully and the keys have been added'));
