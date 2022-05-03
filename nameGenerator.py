# This is a script that generates users(with thier details) and stores them in a .txt file
import names
import csv
import mysql.connector
from mysql.connector import Error


# from database.config import main as connectToDB

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

def storePeopleInDatabase():
	# mydb = connectToDB()
	
	try:
		connection = mysql.connector.connect(
			host="localhost",
			user="root",
			password="5308danielromeo"
		)
		if connection.is_connected():
			db_Info = connection.get_server_info()
			print("Connected to MySQL Server version ", db_Info)
			cursor = connection.cursor()
			cursor.execute("select database();")
			record = cursor.fetchone()
			print("You're connected to database: ", record)

	except Error as e:
		print("Error while connecting to MySQL", e)
	finally:
		if connection.is_connected():
			cursor.close()
			connection.close()
			print("MySQL connection is closed")

	#here i gotta create a for loop that gets all the users from the csv file and runs it through the sql
	# sql = "INSERT INTO users (firstname, lastname, password, email, verifiedemail) VALUES (%s, %s,%s, %s,%s)"
	# val = ("John", "Highway", "password", "main@gmail.com", "1")
	# mycursor.execute(sql, val)

	# mydb.commit()
	# print(mycursor.rowcount, "record inserted.")



storePeopleInDatabase()
generatePeople()

