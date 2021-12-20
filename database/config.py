import mysql.connector

def main():
	mydb = mysql.connector.connect(
	  host="localhost",
	  user="root",
	  password="5308danielromeo",
	  database="randnotex"
	)
	return mydb

	print(mydb) 

# main()