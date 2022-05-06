# This is a script that generates users(with thier details) and stores them in a .txt file
import names
import csv

# from database.config import main as connectToDB
from database.config import Database

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

	for i in range(3):
		firstname = names.get_first_name()
		lastname = names.get_last_name()
		fullname = firstname+lastname
		
		key = RSA.generate(2048)
		public_key = key.publickey().exportKey("PEM")
		private_key = key.exportKey("PEM")

		person = {
			"firstname": firstname,
			"lastname": lastname,
			"password": "password",
			"email": fullname+"@randnoteGen.com",
			"verifiedemail": 1,
			"publicKey": public_key,
			"privateKey": private_key
		}	
		# print(person, end='\n')
		personDictionary = [person["firstname"], person["lastname"], person["email"], person["password"], person["verifiedemail"], person["publicKey"], person["privateKey"]]
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

myDB = Database( 'randnotex', 'root', '5308danielromeo', 'localhost')
myDB.connect()

# create field list before inserting records...


# extract the details of per user from the csv and add them to the list myfileList
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
		print(myFieldList)
		line_count += 1	
	print(f'Processed {line_count} lines.')


# myDB.insert(myTableName, myFieldList)






# myDB.disconnect()

	# here i gotta create a for loop that gets all the users from the csv file and runs it through the sql
	# sql = "INSERT INTO users (firstname, lastname, password, email, verifiedemail) VALUES (%s, %s,%s, %s,%s)"
	# val = ("John", "Highway", "password", "main@gmail.com", "1")
	# mycursor.execute(sql, val)

	# mydb.commit()
	# print(mycursor.rowcount, "record inserted.")



# storePeopleInDatabase()
# generatePeople()

