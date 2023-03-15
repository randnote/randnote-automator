# randnote-automator
1. A randnote automator for transactions and mining. Uses +-50 radomly created accounts; transacts and mines using these accounts. 
2. There are a total of 5 scripts:
   1. The `nameGenrator.ts`  which is responsible for generating a list of users who will transact continously.
   2. The `worker_buy.ts`, an ongoing script taht keeps getting users from the DB, randomly selects one, and tries to purchase notes with them if their balance is greater than a given value.
   3. The `worker_sell.ts`, an ongoing script taht keeps getting users from the DB, randomly selects one, and tries to sell notes with them if their Notes balance in the blockchain is greater than a given value.
   4. The `worker_miner.ts`, an ongoing script that selects a random user and tries to mine the blockchain with their public address.
   5. The `worker_sendNotes.ts`, an ongoing script that selects a 2 random users, checks if one of the users has a greater Notes balance in the blockchain that is greater than a given value, then tries to send notes to the other user.

The `nameGenerator.ts` is meant to be ran once, to install the list of fake users in the backend(the database). The developer must then comment out this script in the `index.ts` and then uncomment out the `main()` function that will allow all the other funcitons to start running continously.

## How to start the application

1. `yarn install`
2. `yarn run dev`
