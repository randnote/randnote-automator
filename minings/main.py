# lets try to calculate a hash:

import requests
import json

from hashlib import sha256
MAX_NONCE = 100000000000

# get all transactions:
transactions = requests.get('http://localhost:8033/transactions')

# get the block to get ready for mining:



def requestBlock():
	mine = requests.get('http://localhost:8033/mine/romeo/0')
	print (json.dumps(mine.json(), indent=2)) # incase I wanna print it

	jsonObject = mine.json()
	blockTimestamp = jsonObject['block']['timestamp']
	blockTransactions = jsonObject['block']['transactions']

	# I might have to add the transactions in a list, not sure

	print(blockTransactions)

requestBlock()

def SHA256(text):
    return sha256(text.encode("ascii")).hexdigest()


# def mine(block_number, transactions, previous_hash, prefix_zeros):
# 	""" Mining function that solves the puzzle"""
#     prefix_str = '0'*prefix_zeros
#     for nonce in range(MAX_NONCE):
#         text = str(block_number) + transactions + previous_hash + str(nonce)
#         new_hash = SHA256(text)
#         if new_hash.startswith(prefix_str):
#             print(f"Yay! Successfully mined bitcoins with nonce value:{nonce}")
#             return new_hash
#     raise BaseException(f"Couldn't find correct has after trying {MAX_NONCE} times")

def sendMineHashToServer():
	""" sends the mine to the server blockchain """

main():
	print("Main function of the mining section")