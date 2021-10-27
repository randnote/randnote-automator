# This is a script that generates users(with thier details) and stores them in a .txt file
import names
# from Crypto.PublicKey import RSA

from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA

message = b'To be signed'
key = RSA.import_key(open('private_key.der').read())
h = SHA256.new(message)
signature = pkcs1_15.new(key).sign(h)


#-----------------------

def generateFullnames():
	mylist = []
	for i in range(10):
		# print(names.get_full_name())
		mylist.append(names.get_full_name())
	return mylist

def generateKeys():
	#
	return 1;

# key = RSA.generate(2048)
# public_key = key.publickey().exportKey("PEM")
# private_key = key.exportKey("PEM")
# print(public_key)



def generatePeople():

	# person = {
	# 	"firstname": "",
	# 	"lastname": "",
	# 	"password": "",
	# 	"email": "",
	# 	"verifiedemail": ""
	# }

	for i in range(10):
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
			"email": fullname,
			"verifiedemail": 0,
			"publicKey": "",
			"privateKey": ""
		}	

