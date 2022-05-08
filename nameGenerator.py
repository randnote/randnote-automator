# This is a script that generates users(with thier details) and stores them in a .txt file
import names
import csv

# from database.config import main as connectToDB
from database.config import Database
from scripts.passwordGenerator import generate_random_password

from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA

def generateFullnames():
	mylist = []
	for i in range(10):
		# print(names.get_full_name())
		mylist.append(names.get_full_name())
	return mylist

def generatePeople():
	key = RSA.generate(2048)
	public_key = key.publickey().exportKey("PEM")
	private_key = key.exportKey("PEM")

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
			"publicKey": public_key,
			"privateKey": private_key
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

	key = RSA.generate(2048)
	public_key = key.publickey().exportKey("PEM")
	private_key = key.exportKey("PEM")

	# extract the details of per user from the csv and add them to the list myfileList
	myDB = Database( 'randnotex', 'root', '5308danielromeo', 'localhost')
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
				"publicKey": public_key,
				"privatKey": private_key
			}
			myDB.addUsersToAddresses(userAddressObject) # call the db method
			line_count += 1	

generatePeople()

