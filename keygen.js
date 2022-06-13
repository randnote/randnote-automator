var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const key = ec.genKeyPair();

const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
      {id: 'public', title: 'Public'},
      {id: 'private', title: 'Private'},
     
    ]
});
  
const data = [
{
    public:     key.getPublic("hex"),
    private:    key.getPrivate("hex")
}
];

// const  append = async()=>{
//     for (let i = 0; i < 100; i++) {
//         data.push({
//             public:     await key.getPublic("hex"),
//             private:   await key.getPrivate("hex")
//         })
//        await  console.log( await key.getPublic("hex"))
        
//     }
// }

// append()

const checkAndWrite = () =>{
    //
    // row_count = sum(1 for row in fileObject)  # fileObject is your csv.reader
}
  
csvWriter
    .writeRecords(data)
    .then(checkAndWrite());
