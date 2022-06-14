# This is a script that generates users(with thier details) and stores them in a .txt file
import names
import csv
from database.config import Database
from scripts.passwordGenerator import generate_random_password



def generatePeople():

	for i in range(5):
		firstname = names.get_first_name()
		lastname = names.get_last_name()
		fullname = firstname+lastname
		
		person = {
			"firstname": firstname,
			"lastname": lastname,
			"password": generate_random_password(),
			"email": fullname+"@randnoteGen.com",
			"verifiedemail": 1,
			"publicKey": 2,
			"privateKey": 2
		}	
		# print(person, end='\n')
		personDictionary = [person["firstname"], person["lastname"], person["email"], person["password"], person["verifiedemail"], person["publicKey"], person["privateKey"]]
		storeHeadersInCSV()
		storeInCSV(personDictionary)

def storeHeadersInCSV():
	with open('people.csv', 'w', encoding='UTF8') as f:
		writer = csv.writer(f)
		header = ['firstname', 'lastname', 'email', 'password', 'verifiedemail', 'public_key', 'private_key']
		writer.writerow(header) # write the header

def storeInCSV(item):
	with open('people.csv', 'a', encoding='UTF8') as f:
		writer = csv.writer(f)
		writer.writerow(item)
	storePeopleInDB()


def storePeopleInDB():

	# extract the details of per user from the csv and add them to the list myfileList
	myDB = Database( 'randnotex', 'root', '', 'localhost')
	file = open("people.csv")
	reader = csv.reader(file)
	NumberOfLines= len(list(reader)) # Get the number of lines in the csv file

	# Loop through csv file and add to myFieldList and then call INSERT
	with open('people.csv', mode='r') as csv_file:
		csv_reader = csv.DictReader(csv_file)
		line_count = 0
		for row in csv_reader:
			if line_count == 0:
				print(f'Column names are {", ".join(row)}')
				line_count += 1

			myFieldList = {
				"firstname": row["firstname"],
				"lastname": row["lastname"],
				"email": row["email"],
				"password": row["password"],
				"verifiedemail": row["verifiedemail"],	
				"balance": 1000
			}
			myDB.insert('users', myFieldList)

			# call the last db user here and then create a proper dictionary, then send it off to the db model to insert in addresses table
			lastUser = myDB.getLastUser()
			userAddressObject = {
				"user_id": lastUser[0],
				"publicKey": 1,
				"privatKey": 1
			}
			myDB.addUsersToAddresses(userAddressObject) # call the db method
			line_count += 1	

# generatePeople()

