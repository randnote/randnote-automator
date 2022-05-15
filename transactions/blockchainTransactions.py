import requests
import json

# get all transactions:
# transactions = requests.get('http://localhost:8033/transactions')

# response = requests.get("http://api.open-notify.org/astros.json")
response = requests.get("http://localhost:8033/transactions")

def randomAmountSelector(minimumAmount = 0 , maximumAmount = 100):
	'''Def that selects an amount between two numbers given(taking into account the users balance)'''

	# this program first gets the users balance from the blockchain and then 


def makeRandomTransaction():
	# send a transaction to the blockchain...
	url = 'http://localhost:8033/transaction'
	myobj = {
		"fromAddress": "047b1ca607797acfdd5d27173275484cf97ac0bc434a5fee5bd2a1e086cfe5ed42fc43220068120875e64713971f185fa538108b5992f494228f6865112c953453",
    	"fromAddressPrivateKey": "d56f2bd3eb7c5612fbc04c96342102327c7c9ae44abf01ed5316604747d6f111",
    	"toAddress": "kim",
    	"amount": 15
	}
	jj = json.dumps(myobj, separators=(',', ':'))
	print(jj)
	x = requests.post(url, data = {'obj': jj})
	# print(x.text)

makeRandomTransaction()

def main():
	print(response.json())