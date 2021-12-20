# This is a script that generates users(with thier details) and stores them in a .txt file
import names
import csv
import mysql.connector


from database.config import main as connectToDB

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
		email = fullname+'@gmail.com'
		
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

def storePeopleInDatabase():
	mydb = connectToDB()

	# mydb = mysql.connector.connect(
	#   host="localhost",
	#   user="root",
	#   password="5308danielromeo"
	# )
	mycursor = mydb.cursor()

	sql = "INSERT INTO users (firstname, lastname, password, email, verifiedemail) VALUES (%s, %s,%s, %s,%s)"
	val = ("John", "Highway", "password", "main@gmail.com", "1")
	mycursor.execute(sql, val)

	mydb.commit()
	print(mycursor.rowcount, "record inserted.")



storePeopleInDatabase()
# generatePeople()

