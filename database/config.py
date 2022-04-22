# from sqlite3 import connect
# import mysql.connector

# def main():
# 	mydb = mysql.connector.connect(
# 	  host="localhost",
# 	  user="root",
# 	  password="5308danielromeo",
# 	  database="randnotex"
# 	)
# 	return mydb

# 	print(mydb) 

# main()

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="5308danielromeo"
)

print(mydb) 