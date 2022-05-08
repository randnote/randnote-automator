from multiprocessing import connection
from sqlite3 import connect
import mysql.connector
from mysql.connector import Error


class Database:
	def __init__(self, databaseName, databaseUsername, databasePassword, host):
		self.databaseName = databaseName
		self.databasePassword = databasePassword
		self.host = host
		self.databaseUsername = databaseUsername
		
		try:
			self.connection = mysql.connector.connect(
				host=     self.host,
				user=     self.databaseUsername,
				password= self.databasePassword,
				database = 'randnotex'
			)

			if self.connection.is_connected():
				db_Info = self.connection.get_server_info()
				print("Connected to MySQL Server version ", db_Info)
				self.cursor = self.connection.cursor()
				self.cursor.execute("select database();")
				record = self.cursor.fetchone()
				print("You're connected to database: ", record)
		except Error as e:
			print("Error while connecting to MYSQL", e)

	def getLastUser(self):
		'''This def gets the last user in the users table'''
		mySql_insert_query = """SELECT * FROM users ORDER BY id DESC LIMIT 1"""
		self.cursor = self.connection.cursor()
		self.cursor.execute(mySql_insert_query)
		result = self.cursor.fetchone()
		return result
	
	def addUsersToAddresses(self, theFieldList):
		'''This def recieves the user_id and the addresses of a user and stores them in the addresses table'''
		mySql_insert_query = """INSERT INTO addresses (user_id, publicAddress, privateAddress) 
                           VALUES (%s, %s, %s) """
		record = (
			theFieldList["user_id"], 
			theFieldList["publicKey"], 
			theFieldList["privatKey"]
		)
		self.cursor = self.connection.cursor()
		self.cursor.execute(mySql_insert_query, record)
		self.connection.commit()
		print(self.cursor.rowcount, "Record inserted successfully into addresses")
		self.cursor.close()

	def insert(self, tableName, theFiledList): # params are table name and an array of the fields in order...
		# print(f"The record... has been inserted into {tableName}")

		mySql_insert_query = """INSERT INTO users (firstname, lastname, email, password, verifiedemail, balance) 
                           VALUES (%s, %s, %s, %s, %s, %s) """

		record = (
			theFiledList["firstname"], 
			theFiledList["lastname"], 
			theFiledList["email"], 
			theFiledList["password"], 
			theFiledList["verifiedemail"], 
			theFiledList["balance"]
		)
		self.cursor = self.connection.cursor()

		self.cursor.execute(mySql_insert_query, record)
		self.connection.commit()
		print(self.cursor.rowcount, "Record inserted successfully into  table")
		self.cursor.close()



