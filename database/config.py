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
    
	def connect(self):
		try:
			connection = mysql.connector.connect(
				host=     self.host,
				user=     self.databaseUsername,
				password= self.databasePassword
			)

			if connection.is_connected():
				db_Info = connection.get_server_info()
				print("Connected to MySQL Server version ", db_Info)
				cursor = connection.cursor()
				cursor.execute("select database();")
				record = cursor.fetchone()
				print("You're connected to database: ", record)
		except Error as e:
			print("Error while connecting to MYSQL", e)

	def disconnect():
		# try:
		# 	connection


# def connectToDB(connection):
#   try:
#       connection = mysql.connector.connect(
#         host="localhost",
#         user="root",
#         password="5308danielromeo"
#       )
#       if connection.is_connected():
#         db_Info = connection.get_server_info()
#         print("Connected to MySQL Server version ", db_Info)
#         cursor = connection.cursor()
#         cursor.execute("select database();")
#         record = cursor.fetchone()
#         print("You're connected to database: ", record)

#   except Error as e:
#     print("Error while connecting to MySQL", e)
#   # finally:
#   #   if connection.is_connected():
#   #     cursor.close()
#   #     connection.close()
#   #     print("MySQL connection is closed")
#   return connection

# def disconnectFromDB(connection):
#   if connection.is_connected():
#       # cursor.close()
#       connection.close()
#       print("MySQL connection is closed")
#   else:
#     return