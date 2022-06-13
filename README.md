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