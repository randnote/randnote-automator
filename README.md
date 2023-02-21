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

/*
	DEVELOPER NOTES ON THE AUTOMATOR...
	My plan is to run a particular function multipe times untill 10 seconds is over... 
	- This means that if the funciton running is buyingNotes(), this function should run multipe times over till 10 secs is overm
	  meaning that perhaps 20 users will be buying notes in that timeframe.


	ACTUALLY SCRATCH WHATEVER I WAS ABOUT TO WRITE ,,,, MY NEW SOLUTION IS TO USER WORKER THREADS.
	I realized that the best solution is to have 5 concurrent threads working at the same time.
	1. while loop (true) to keep running 1 function over and over again.
	2. The miner keeps mining and giving randnom users a chance to mine.
	3. Users who qualify will keep selling
	4. Users who qualify will keep donating funds to other users....
*/