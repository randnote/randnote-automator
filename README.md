# randnote-automator
A randnote automator for transactions and mining. Uses 100 radomly created accounts; transacts and mines using these accounts. 

### The entire project is created using python
Although python in probably the slowest tool to do such a task, it was chosen for simplicity sake.

---
#### After adding a library to venv, use:

`python -m pip freeze > requirements.txt` to add the packages to the requirements.txt file

#### To start devloping, use:

`pip install -r requirements.txt` to install all packages to your virtual env. 

This project also uses `NPM`
So run `npm install`


#### Developer Guid:
1. Remember that the nameGenerator.py script in the root directory forms no part of the ongoing process of the application. This script is only meant to be run at the beginnig of the project when setting the project up in any environment. It acts as a creator of the fake-users and stores them to the database.

### Additional notes... 

ACTUALLY SCRATCH WHATEVER I WAS ABOUT TO WRITE ,,,, MY NEW SOLUTION IS TO USER WORKER THREADS.
I realized that the best solution is to have 5 concurrent threads working at the same time.
1. while loop (true) to keep running 1 function over and over again.
2. The miner keeps mining and giving randnom users a chance to mine.
3. Users who qualify will keep selling
4. Users who qualify will keep donating funds to other users....


1. LONG STORY SHORT, I NEED TO WRITE A FUNCITON IN THE BACKEND - SAME THING I DID IN THE FRONTED, WHICH WILL GET ME THE PRICE AND DETERMINE HOW
2. MUCH I SHOULD PAY PER NOTE , PER HOW MANY NOTES